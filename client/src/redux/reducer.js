const initialState = {
  loading: false,
  breeds: [],
  items: [],
  temperaments: [],
  filters: [],
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
    case "GET_DATA":
      return {
        ...state,
        loading: false,
        breeds: action.breeds,
        items: action.breeds,
        temperaments: action.temperaments,
      };
    case "GET_BREEDS":
      return {
        ...state,
        loading: false,
        breeds: action.payload,
        items: action.payload,
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
    case "GET_BREEDS_BY_NAME":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "CLEAR_SEARCH":
      return {
        ...state,
        items: state.breeds,
      };
    case "SET_FILTERS":
      return {
        ...state,
        filters: [...state.filters, action.payload]
      };
    case "DELETE_FILTER":
      return {
        ...state,
        filters: state.filters.filter(f => f !== action.payload)
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: [],
      };
    case "SET_ITEMS":
      return {
        ...state,
        items: [...action.payload],
      };
    default:
      return { ...state };
  }
};

export default reducer;
