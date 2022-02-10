import React, { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommendations from './components/Recommendations';
import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS } from './queries';
import { BOOK_ADDED } from './subscriptions';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const books = useQuery(ALL_BOOKS);
  const authors = useQuery(ALL_AUTHORS);
  const client = useApolloClient();
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({
      subscriptionData: {
        data: { bookAdded },
      },
    }) => {
      updateCacheWith(bookAdded);
      window.alert(`you have now saved ${bookAdded.title} to our records`);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('libUserUID');
    if (token) {
      setToken(token);
    }
  }, []);

  const logout = async () => {
    await client.clearStore();
    localStorage.removeItem('libUserUID');
    setToken(null);
    setPage('authors');
    window.history.go();
  };

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <div style={{ display: 'inline-block' }}>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </div>
        )}
      </div>

      <Authors show={page === 'authors'} authors={authors} />

      <Books show={page === 'books'} books={books} />

      <NewBook show={page === 'add'} />

      <LoginForm show={page === 'login'} setToken={setToken} />

      <Recommendations show={page === 'recommend'} />
    </div>
  );
};

export default App;
