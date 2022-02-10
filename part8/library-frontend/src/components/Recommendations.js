import React from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries';

const Recommendations = ({ show }) => {
  const { data, error, loading } = useQuery(ME);
  const books =
    useApolloClient().readQuery({ query: ALL_BOOKS })?.allBooks || [];

  if (!show) {
    return null;
  }

  if (error) {
    return <h2>Oops something went wrong :(</h2>;
  }

  if (loading) {
    return <h2>loading...</h2>;
  }

  if (data) {
    const favoriteGenre = data.me.favoriteGenre;

    const booksToShow = books.filter((book) =>
      book.genres.includes(favoriteGenre)
    );

    return (
      <div>
        <h1>Recommendations</h1>
        <p>
          books in your favourite genre <b>{favoriteGenre}</b>
        </p>

        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {booksToShow.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Recommendations;
