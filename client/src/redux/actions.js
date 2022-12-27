import axios from "axios";

export const loadingOn = () => {
  return {
    type: "LOADING_ON",
  };
};

export const getTemperaments = () => {
  return async (dispatch) => {
    dispatch(loadingOn());
    let temperaments = await axios.get("http://localhost:3001/temperaments");
    return dispatch({ type: "GET_TEMPERAMENTS", payload: temperaments });
  };
};

export const getBreeds = () => {
  return async (dispatch) => {
    dispatch(loadingOn());
    let dogs = await axios.get("http://localhost:3001/dogs");
    return dispatch({ type: "GET_BREEDS", payload: dogs.data });
  };
};

export const firstPage = () => {
  return { type: "FIRST_PAGE" };
};

export const prevPage = () => {
  return { type: "PREV_PAGE" };
};

export const nextPage = () => {
  return { type: "NEXT_PAGE" };
};

export const lastPage = () => {
  return { type: "LAST_PAGE" };
};

export const setPage = (page) => {
  return { type: "SET_PAGE", payload: page };
};

export const getBreedsByName = (name) => {
  return async (dispatch) => {
    dispatch(loadingOn());
    let dogs = await axios.get(`http://localhost:3001/dogs?name=${name}`);
    return dispatch({ type: "GET_BREEDS_BY_NAME", payload: dogs.data });
  };
};

export const clearSearch = () => {
  return { type: "CLEAR_SEARCH" };
};

export const getData = () => {
  return async (dispatch) => {
    dispatch(loadingOn());
    let dogs = await axios.get("http://localhost:3001/dogs");
    let temperaments = await axios.get("http://localhost:3001/temperaments");
    return dispatch({
      type: "GET_DATA",
      breeds: dogs.data,
      temperaments: temperaments.data,
    });
  };
};

export const setFilters = (value, state) => {
  return {type: 'SET_FILTERS', value, state}
};

export const clearFilters = () => {
  return {type: 'CLEAR_FILTERS'}
};

export const setItems = (payload) => {
  return {type: 'SET_ITEMS', payload}
}
