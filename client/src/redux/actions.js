import axios from "axios";

export const loadingOn = () => {
  return {
    type: "LOADING_ON",
  };
};

export const getTemperaments = () => {
  return async (dispatch) => {
    dispatch(loadingOn());
    let temperaments = await axios.get("/temperaments");
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
    try {
      let response = await axios.post("/dogs", newBreed);
      if (response.status === 201) {
        let dogs = await axios.get("/dogs");
        return dispatch({ type: "GET_BREEDS", payload: dogs.data });
      }
    } catch (e) {
      throw e;
    }
  };
};

export const updateBreed = (breed, id) => {
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
    try {
      let response = await axios.put(`/dogs/${id}`, newBreed);
      if (response.status === 200) {
        let dogs = await axios.get("/dogs");
        return dispatch({ type: "GET_BREEDS", payload: dogs.data });
      }
    } catch (e) {
      throw e;
    }
  };
};

export const deleteBreed = (id) => {
  return async (dispatch) => {
    dispatch(loadingOn());
    try {
      await axios.delete(`/dogs/${id}`);
      let dogs = await axios.get("/dogs");
      return dispatch({ type: "GET_BREEDS", payload: dogs.data });
    } catch (e) {
      throw e;
    }
  };
};

export const getBreeds = () => {
  return async (dispatch) => {
    dispatch(loadingOn());
    let dogs = await axios.get("/dogs");
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
    let dogs = await axios.get(`/dogs?name=${name}`);
    return dispatch({ type: "GET_BREEDS_BY_NAME", payload: dogs.data });
  };
};

export const getDogById = (id) => {
  return async (dispatch) => {
    dispatch(loadingOn());
    try {
      let dog = await axios.get(`/dogs/${id}`);
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
    try {
      let dogs = await axios.get("/dogs");
      let temperaments = await axios.get("/temperaments");
      return dispatch({
        type: "GET_DATA",
        breeds: dogs.data,
        temperaments: temperaments.data,
      });
    } catch (e) {
      console.log("hubo un error");
      console.log(e);
    }
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

export const setName = (payload) => {
  return { type: "SET_NAME", payload}
}

export const setItems = (payload) => {
  return { type: "SET_ITEMS", payload };
};

export const setNotification = (title, msg, ico) => {
  return { type: "SET_NOTIFICATION", title, msg, ico };
};

export const hideNotification = () => {
  return { type: "HIDE_NOTIFICATION" };
};

export const showNotification = () => {
  return { type: "SHOW_NOTIFICATION" };
};

export const clearNotification = () => {
  return { type: "CLEAR_NOTIFICATION" };
};
