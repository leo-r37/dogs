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
    return dispatch({ type: "GET_TEMPERAMENTS", payload: temperaments.data });
  };
};

export const createBreed = (breed) => {
  let {
    name,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    lifeSpan,
    imageUrl,
    temperaments,
  } = breed;
  let newBreed = {
    name,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    life_span: lifeSpan,
    image: imageUrl,
    temperaments,
  };
  return async (dispatch) => {
    dispatch(loadingOn());
    await axios.post("http://localhost:3001/dogs", newBreed);
    let dogs = await axios.get("http://localhost:3001/dogs");
    return dispatch({ type: "GET_BREEDS", payload: dogs.data });
  };
};

export const deleteBreed = (id) => {
  return async (dispatch) => {
    dispatch(loadingOn());
    await axios.delete(`http://localhost:3001/dogs/${id}`);
    let dogs = await axios.get("http://localhost:3001/dogs");
    return dispatch({ type: "GET_BREEDS", payload: dogs.data });
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

export const getDogById = (id) => {
  return async (dispatch) => {
    dispatch(loadingOn());
    try {
      let dog = await axios.get(`http://localhost:3001/dogs/${id}`);
      return dispatch({ type: "GET_DOG_BY_ID", payload: dog.data });
    } catch (e) {
      throw e;
    }
  };
};

export const clearCurrentDog = () => {
  return { type: "CLEAR_CURRENT_DOG" };
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

export const setFilters = (payload) => {
  return { type: "SET_FILTERS", payload };
};

export const deleteFilter = (payload) => {
  return { type: "DELETE_FILTER", payload };
};

export const clearFilters = () => {
  return { type: "CLEAR_FILTERS" };
};

export const setItems = (payload) => {
  return { type: "SET_ITEMS", payload };
};
