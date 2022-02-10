import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import { createGenreList } from '../utils/helperFunctions';

const Books = ({ show, books }) => {
  const [filter, setFilter] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [allBooks, { error, loading }] = useLazyQuery(ALL_BOOKS, {
    notifyOnNetworkStatusChange: true,
  });

  const { data } = books;
  const handleClick = async (genre) => {
    switch (genre) {
      case 'all':
        setFilter('');
        break;

      default:
        setFilter(genre);
        const response = await allBooks({
          variables: {
            genre,
          },
        });
        setFilteredBooks(response.data.allBooks);
    }
  };

  if (!show) {
    return null;
  }

  if (error) {
    return <h1>something went wrong :{'('}</h1>;
  }

  if (loading) {
    return <h1>loading...</h1>;
  }

  if (data) {
    const genreList = createGenreList(data.allBooks);

    const booksToShow = filter ? filteredBooks : data.allBooks;

    return (
      <div>
        <h2>books</h2>
        <div style={{ minHeight: 20 }}>
          {filter && (
            <p>
              in genre <b>{filter}</b>
            </p>
          )}
        </div>

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

        <div style={{ marginBlock: 7 }}>
          <button onClick={() => handleClick('all')}>all</button>
          {genreList.map((genre) => (
            <button key={genre} onClick={() => handleClick(genre)}>
              {genre}
            </button>
          ))}
        </div>
      </div>
    );
  }
};

export default Books;
