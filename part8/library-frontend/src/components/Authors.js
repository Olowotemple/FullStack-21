import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';
import { EDIT_AUTHOR } from '../mutations';

const Authors = ({ show, authors }) => {
  const [born, setBorn] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [editAuthor, { error, loading }] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => void console.error(error),
  });
  const { data } = authors;

  const handleSubmit = (evt) => {
    evt.preventDefault();

    editAuthor({ variables: { name: selectValue, born: +born } });

    setSelectValue('');
    setBorn('');
  };

  if (!show) {
    return null;
  }

  if (error) {
    return <p>some went wrong :(</p>;
  }

  if (loading) {
    return <p>submitting...</p>;
  }

  if (data) {
    const authors = data.allAuthors;

    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>set birthyear</h2>
        <form onSubmit={handleSubmit}>
          name
          <select
            value={selectValue}
            onChange={(evt) => setSelectValue(evt.target.value)}
          >
            {authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
          <br />
          born
          <input
            value={born}
            onChange={(evt) => setBorn(evt.target.value)}
          />{' '}
          <br />
          <button>update author</button>
        </form>
      </div>
    );
  }

  return null;
};

export default Authors;
