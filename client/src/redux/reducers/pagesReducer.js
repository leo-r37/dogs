const initialState = {
  currentPage: 1,
  itemsPerPage: 8,
  firstElement: 0,
  lastElement: 8,
};

const pagesReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case "FIRST_PAGE":
      return {
        ...state,
        currentPage: 1,
        firstElement: 0,
        lastElement: 8,
      };
    case "LAST_PAGE":
      return {
        ...state,
        currentPage: Math.ceil(state.breeds.length / state.itemsPerPage),
        firstElement:
          Math.ceil(state.breeds.length / state.itemsPerPage) *
            state.itemsPerPage -
          state.itemsPerPage,
        lastElement:
          Math.ceil(state.breeds.length / state.itemsPerPage) *
          state.itemsPerPage,
      };
    case "SET_PAGE":
      return {
        ...state,
        currentPage: action.payload,
        firstElement: action.payload * state.itemsPerPage - state.itemsPerPage,
        lastElement: action.payload * state.itemsPerPage,
      };
    default:
      return { ...state };
  }
};

export default pagesReducer;
