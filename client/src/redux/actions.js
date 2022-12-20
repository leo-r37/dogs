import axios from 'axios';

export const loadingOn = () => {
    return {
        type: 'LOADING_ON'
    }
};

export const getTemperaments = () => {
    return async (dispatch) => {
        dispatch(loadingOn());
        let temperaments = await axios.get('http://localhost:3001/temperaments');
        return dispatch({type: 'GET_TEMPERAMENTS', payload: temperaments})
    }
}

export const getBreeds = () => {
    return async (dispatch) => {
        dispatch(loadingOn());
        let dogs = await axios.get('http://localhost:3001/dogs');
        return dispatch({type: 'GET_BREEDS', payload: dogs.data})
    }
}