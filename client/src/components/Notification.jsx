import { connect } from "react-redux";
import s from "./Notification.module.css";

const Notification = ({title, msg, ico}) => {
  return (
    <div className={s.notification}>
      <div
        className={
          title === "Error!"
            ? s.notificationTitleError
            : s.notificationTitleSuccess
        }
      >
        {title}
      </div>
      <div className={s.notificationTextAndIconArea}>
        <div className={s.notificationText}>{msg}</div>
        <div className={s.notificationIcon}>{ico}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
    title: state.notification.title,
    msg: state.notification.msg,
    ico: state.notification.ico,
  });
    
  export default connect(mapStateToProps, null)(Notification);
