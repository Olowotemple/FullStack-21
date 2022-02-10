const initialState = {
  notification: null,
  timeoutID: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      if (state.timeoutID) {
        clearTimeout(state.timeoutID);
      }
      return { ...state, notification: action.data };

    case 'CLEAR_NOTIFICATION':
      return {
        notification: null,
        timeoutID: null,
      };

    case 'SET_TIMEOUT_ID':
      return { ...state, timeoutID: action.data };

    default:
      return state;
  }
};

const addNotification = (notification) => ({
  type: 'SET_NOTIFICATION',
  data: notification,
});

const removeNotification = () => ({
  type: 'CLEAR_NOTIFICATION',
});

const createSetTimeoutID = (timeoutID) => ({
  type: 'SET_TIMEOUT_ID',
  data: timeoutID,
});

export const setNotification =
  (notification, duration = 5) =>
  (dispatch) => {
    dispatch(addNotification(notification));

    const timeoutID = setTimeout(() => {
      dispatch(removeNotification());
    }, duration * 1000);

    console.log('timeoutID is', timeoutID);
    dispatch(createSetTimeoutID(timeoutID));
  };

export default reducer;
