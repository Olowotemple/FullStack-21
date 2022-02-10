const reducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_FILTER':
      const { filter } = action.data;
      return filter;

    default:
      return state;
  }
};

export const changeFilter = (filter) => ({
  type: 'CHANGE_FILTER',
  data: {
    filter,
  },
});

export default reducer;
