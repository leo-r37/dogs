const initialState = {
  status: false,
  title: "",
  msg: "",
  ico: "",
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return {
        ...state,
        title: action.title,
        msg: action.msg,
        ico: action.ico,
      };
    case "SHOW_NOTIFICATION":
      return {
        ...state,
        status: true,
      };
    case "HIDE_NOTIFICATION":
      return {
        status: false,
        title: "",
        msg: "",
        ico: "",
      };
    default:
      return { ...state };
  }
};

export default notificationReducer;
