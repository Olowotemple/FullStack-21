const {
  AuthenticationError,
  UserInputError,
} = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const { PubSub } = require('graphql-subscriptions');
const User = require('./models/user');
const Book = require('./models/book');
const Author = require('./models/author');
const { JWT_SECRET } = require('./utils/config');

const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (_, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author');
        // return await (await Book.find({})).populate('author');
      }

      // if (args.author && args.genre) {
      //   return books.filter(
      //     (book) =>
      //       book.author === args.author && book.genres.includes(args.genre)
      //   );
      // }

      // if (args.author) {
      //   return books.filter((book) => book.author === args.author);
      // }

      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate('author');
      }
    },

    allAuthors: async () => await Author.find({}),

    me: (_root, _args, context) => context.currentUser,
  },

  Mutation: {
    addBook: async (_, args, ctx) => {
      const currentUser = ctx.currentUser;

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        // create new author
        try {
          author = new Author({ name: args.author });
          author = await author.save();
        } catch (error) {
          throw new UserInputError('bad input');
        }
      }

      const book = new Book({
        ...args,
        author: author._id,
      });

      try {
        author.bookCount++;
        const rAuthor = await author.save();
        const savedBook = await (await book.save()).populate('author');

        pubsub.publish('BOOK_ADDED', {
          bookAdded: savedBook,
        });

        return savedBook;
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },

    editAuthor: async (_, args, ctx) => {
      const currentUser = ctx.currentUser;

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      let author = await Author.findOne({ name: args.name });

      if (!author) {
        return null;
      }

      try {
        return await Author.findByIdAndUpdate(
          author._id,
          { born: args.setBornTo },
          {
            new: true,
          }
        );
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },

    createUser: async (_root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      try {
        return await user.save();
      } catch (err) {
        throw new UserInputError(err.message, { invalidArgs: args });
      }
    },

    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};

module.exports = resolvers;
