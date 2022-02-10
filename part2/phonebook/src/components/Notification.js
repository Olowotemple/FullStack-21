const Notification = ({ notificationMessage, successStyle, errorStyle }) => {
  if (!notificationMessage.type) {
    return null;
  }
  const { message, type } = notificationMessage;

  return (
    <div style={type === 'success' ? successStyle : errorStyle}>{message}</div>
  );
};

export default Notification;
