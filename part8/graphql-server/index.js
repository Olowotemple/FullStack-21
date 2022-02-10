const http = require('http');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { execute, subscribe } = require('graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const jwt = require('jsonwebtoken');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');
const { MONGODB_URI, JWT_SECRET } = require('./utils/config');
const User = require('./models/user');

(async function startApolloServer(typeDefs, resolvers) {
  const app = express();

  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: '/graphql',
    }
  );

  const server = new ApolloServer({
    schema,

    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],

    context: async ({ req }) => {
      const auth = req.headers.authorization;
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const token = auth.slice(7);
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      }
    },
  });

  await server.start();
  server.applyMiddleware({
    app,
  });

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  console.log(
    `🚀 Subscription endpoint ready at ws://localhost:4000${server.graphqlPath}`
  );
})(typeDefs, resolvers);

(async function connectToMongo() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('connection to Mongo established 💯');
  } catch (error) {
    console.error(
      'could not establish a connection to Mongo 😖',
      error.message
    );
  }
})();
