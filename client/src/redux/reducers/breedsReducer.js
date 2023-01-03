const initialState = {
  loading: false,
  breeds: [],
  items: [],
  currentDog: {},
  temperaments: [],
};

const breedsReducer = (state = initialState, action) => {
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
        case "GET_BREEDS_BY_NAME":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "GET_DOG_BY_ID":
      return {
        ...state,
        loading: false,
        currentDog: action.payload,
      };
    case "CLEAR_CURRENT_DOG":
      return {
        ...state,
        currentDog: {},
      };
    case "CLEAR_SEARCH":
      return {
        ...state,
        items: state.breeds,
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

export default breedsReducer;
