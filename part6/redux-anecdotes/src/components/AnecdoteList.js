import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseVote, init } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((anecdote) => anecdote.content.includes(filter))
      .sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const vote = (id) => {
    dispatch(increaseVote(id));
    const votedAnecdote = anecdotes.find((n) => n.id === id);
    dispatch(setNotification(`you voted '${votedAnecdote.content}'`, 10));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
