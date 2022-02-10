import { connect } from 'react-redux';

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  if (!notification.notification) {
    return null;
  }

  return <div style={style}>{notification.notification}</div>;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const ConnectedNotification = connect(mapStateToProps, null)(Notification);
export default ConnectedNotification;
