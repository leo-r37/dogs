const initialState = {
  loading: false,
  breeds: [],
  temperaments: [],
  currentPage: 1,
  itemsPerPage: 8,
  firstElement: 0,
  lastElement: 8,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_ON":
      return {
        ...state,
        loading: true,
      };
    case "GET_BREEDS":
      return {
        ...state,
        loading: false,
        breeds: action.payload,
      };
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        loading: false,
        temperaments: action.payload,
      };
    case "NEXT_PAGE":
      return {
        ...state,
        currentPage: state.currentPage + 1,
        firstElement: state.firstElement + state.itemsPerPage,
        lastElement: state.lastElement + state.itemsPerPage,
      };
    case "PREV_PAGE":
      return {
        ...state,
        currentPage: state.currentPage - 1,
        firstElement: state.firstElement - state.itemsPerPage,
        lastElement: state.lastElement - state.itemsPerPage,
      };
    default:
      return { ...state };
  }
};

export default reducer;
