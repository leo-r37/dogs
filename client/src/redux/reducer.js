const initialState = {
  loading: false,
  breeds: [],
  temperaments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_ON':
      return {
        ...state,
        loading: true
      };
    case 'GET_BREEDS':
      return {
        ...state,
        loading: false,
        breeds: action.payload
      };
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        loading: false,
        temperaments: action.payload 
      };
    default:
      return { ...state };
  }
};

export default reducer;
