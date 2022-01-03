import { SET_LOADING, SET_WATCHLIST, REMOVE_WATCHLIST_ITEM, UPDATE_WATCHLIST_ITEM, SET_COMPANY_LOADING, SELECT_COMPANY} from './type'
import axios from 'axios'
import { select } from 'd3';


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
        const news = data.news
        const pricing = data.pricing
        let selectedCompany = company.company
        if (!selectedCompany) {
            console.log('no co');
            const res = await axios.get(`/api/company/lookup/${company.symbol}`)
            selectedCompany = res.data
        }

        
        
        dispatch({
            type: SELECT_COMPANY,
            payload: {news: news, pricing: pricing, company: selectedCompany}
        })
    } catch (err) {
        console.error(err);
    }
}

//@desc: similar to above pulled from reporting, will refactor watchlist to this call in future. 
export const addCompanyData = (company) => async dispatch => {
    console.log('running add com data');
    try {
        dispatch({
            type: SET_COMPANY_LOADING
        })
        const {data} = await axios.get(`/api/company/details/${company.symbol}`);
        const news = data.news
        const pricing = data.pricing
        let selectedCompany = company.company
        if (!selectedCompany) {
            console.log('no co');
            const res = await axios.get(`/api/company/lookup/${company.symbol}`)
            selectedCompany = res.data
        }
    
        dispatch({
            type: SELECT_COMPANY,
            payload: {news: news, pricing: pricing, company: selectedCompany}
        })
    } catch (err) {
        console.error(err);
    }
}

