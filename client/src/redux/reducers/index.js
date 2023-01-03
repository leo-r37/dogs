import { combineReducers } from "redux";
import breedsReducer from "./breedsReducer";
import filtersReducer from "./filtersReducer";
import pagesReducer from "./pagesReducer";

export default combineReducers({
    breeds: breedsReducer,
    filters: filtersReducer,
    pages: pagesReducer,
})
