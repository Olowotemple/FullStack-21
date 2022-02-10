import anecdoteService from '../services/anecdotes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INCREASE_VOTE':
      const { id, modifiedAnecdote } = action.data;

      return state.map((anecdote) =>
        anecdote.id === id ? modifiedAnecdote : anecdote
      );

    case 'NEW_ANECDOTE':
      const newAnecdote = action.data;
      return state.concat(newAnecdote);

    case 'INIT':
      return action.data;

    default:
      return state;
  }
};

export const increaseVote = (id) => async (dispatch) => {
  const modifiedAnecdote = await anecdoteService.updateAnecdote(id);
  dispatch({
    type: 'INCREASE_VOTE',
    data: {
      id,
      modifiedAnecdote,
    },
  });
};

export const createAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.createAnecdote(content);
  dispatch({
    type: 'NEW_ANECDOTE',
    data: newAnecdote,
  });
};

export const init = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAllAnecdotes();
  dispatch({
    type: 'INIT',
    data: anecdotes,
  });
};

export default reducer;
