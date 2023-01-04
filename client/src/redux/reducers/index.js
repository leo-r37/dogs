import { combineReducers } from "redux";
import breedsReducer from "./breedsReducer";
import filtersReducer from "./filtersReducer";
import pagesReducer from "./pagesReducer";
import notificationReducer from "./notificationReducer";

export default combineReducers({
  breeds: breedsReducer,
  filters: filtersReducer,
  pages: pagesReducer,
  notification: notificationReducer,
});
