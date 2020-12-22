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
        dispatch(createErrorAlert(err.message, 'Get Watchlist'))
    }
}

