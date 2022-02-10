import axios from 'axios';

const baseURL = 'http://localhost:3001/anecdotes';

const getAllAnecdotes = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const createAnecdote = async (content) => {
  const generateId = async () => {
    const anecdotes = await getAllAnecdotes();
    return !anecdotes.length ? 1 : anecdotes.length + 1;
  };
  const obj = {
    content,
    id: await generateId(),
    votes: 0,
  };
  const response = await axios.post(baseURL, obj);
  return response.data;
};

const updateAnecdote = async (id) => {
  const oldAnecdote = (await axios.get(`${baseURL}/${id}`)).data;
  const newAnecdote = {
    ...oldAnecdote,
    votes: oldAnecdote.votes + 1,
  };

  const response = await axios.put(`${baseURL}/${id}`, newAnecdote);
  return response.data;
};

const anecdoteService = {
  getAllAnecdotes,
  createAnecdote,
  updateAnecdote,
};

export default anecdoteService;
