import { SET_LOADING, SET_WATCHLIST, REMOVE_WATCHLIST_ITEM, UPDATE_WATCHLIST_ITEM, SET_COMPANY_LOADING, SELECT_COMPANY} from './type'
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
        dispatch({
            type: SET_LOADING
        })
        const res = await axios.put(`/api/watchlist/removeItem/${id}`);
        console.log(res.data)
        dispatch({
            type: REMOVE_WATCHLIST_ITEM,
            payload: res.data
        })
    } catch (err) {
        console.error(err);
    }
}

export const likeItem = (id) => async dispatch => {
    try {
        dispatch({
            type: SET_LOADING
        })
        const res = await axios.put(`/api/watchlist/like/${id}`);
        dispatch({
            type: UPDATE_WATCHLIST_ITEM,
            payload: res.data
        })
    } catch (err) {
        console.error(err);
    }
}

export const setSelectedCompany = (company) => async dispatch => {
    try {
        dispatch({
            type: SET_COMPANY_LOADING
        })
        const {data} = await axios.get(`/api/company/details/${company.symbol}`);
        
        dispatch({
            type: SELECT_COMPANY,
            payload: {news: data.news, pricing: data.pricing }
        })
    } catch (err) {
        console.error(err);
    }
}

