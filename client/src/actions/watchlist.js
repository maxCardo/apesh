import {SET_WATCHLIST} from './type'
import axios from 'axios'


export const getWatchlist = () => async dispatch => {
    try {
        const res = await axios.get(`/api/watchlist`);
        dispatch({
            type: SET_WATCHLIST,
            payload: res.data
        })
    } catch (err) {
        console.error(err);
    }
}

export const removeItem = (id) => async dispatch => {
    try {
        console.log('running remove');
        const res = await axios.put(`/api/watchlist/removeItem/${id}`);
        console.log(res.data)
        // dispatch({
        //     type: SET_WATCHLIST,
        //     payload: res.data
        // })
    } catch (err) {
        console.error(err);
    }
}

export const likeItem = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/watchlist/like/${id}`);
        dispatch({
            type: SET_WATCHLIST,
            payload: res.data
        })
    } catch (err) {
        console.error(err);
    }
}

