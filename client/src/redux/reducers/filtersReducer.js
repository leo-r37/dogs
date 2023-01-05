const initialState = {
  filters: [],
  origin: "Origin",
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTERS":
      return {
        ...state,
        filters: [...state.filters, action.payload],
      };
    case "DELETE_FILTER":
      return {
        ...state,
        filters: state.filters.filter((f) => f !== action.payload),
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: [],
        origin: "Origin",
      };
    case "SET_NAME":
      return {
        ...state,
        origin: action.payload,
      };
    default:
      return { ...state };
  }
};

export default filtersReducer;
