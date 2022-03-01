import { SET_LOADING, SET_SCANNER, REMOVE_SCANNER_ITEM, UPDATE_SCANNER_ITEM, SET_FILTER_OPTIOINS, SET_FILTER, SET_SELECTED_FILTER, SET_SAVED_FILTERS, SET_SELECTED_ITEM } from './type'
import {createErrorAlert} from "./alert";
import axios from 'axios'


//@desc: test call returns 10 records to fee table
export const getData = (model) => async dispatch => {
    try {
        dispatch({
            type: SET_LOADING
        })
        const res = await axios.get(`/api/filteredData/${model}`);
        dispatch({
            type: SET_SCANNER,
            payload: res.data
        })
    } catch (err) {
        console.error(err);
    }
}

//@desc: get list of saved filters on component load
//ToDo: make user spacific 
export const getSavedFilters = (model) => async dispatch =>{
    try {
        const res = await axios.get(`/api/filteredData/savedFilters/${model}`);
        dispatch({
            type: SET_SAVED_FILTERS,
            payload: res.data
        })
    
    } catch (err) {
        console.error(err);
    }
}

//@desc: Loads filter options from dataset 
export const getFilterOptions = (model, data) => async dispatch => {
    try {
        const res = await axios.post(`/api/filteredData/filterOptions/${model}`, data);
        dispatch({
            type: SET_FILTER_OPTIOINS,
            payload: res.data
        })
    } catch (err) {
        console.error(err);
    }
}

//@desc: reload component with filterd data set on selcted of saved or new filter
export const fetchFilteredData = (model, data, label) => async dispatch => {
    console.log('the data: ', data, label)
    try {
            dispatch({
            type: SET_LOADING
        })
        const res = await axios.post(`/api/filteredData/loadFilter/${model}`, data);
        console.log('filterRes: ', res.data)
        dispatch({
            type: SET_FILTER,
            payload: res.data
        })
        dispatch({
            type: SET_SELECTED_FILTER,
            payload: label ? label : null
        })
        
    } catch (err) {
        console.error(err);
    }
}

export const submitSaveFilter = (model,name, filter) => async dispatch =>{
    try {
        console.log('running submit save filter')
        const data = {name, filter}
        const res = await axios.post(`/api/filteredData/saveFilter/${model}`, data);
        console.log('saveFilterRes: ', res.data)
        dispatch({
            type: SET_SELECTED_FILTER,
            payload: res.data
        })
    
    } catch (err) {
        console.error(err);
    }
}

export const removeItem = (model, data) => async dispatch => {
    try {
        dispatch({
            type: REMOVE_SCANNER_ITEM,
            payload: [data.item_id]
        })
        console.log('running remove', data);
        const res = await axios.put(`/api/filteredData/blacklist/${model}`, data);
        console.log(res.data)
    } catch (err) {
        console.error(err);
    }
}

export const removeMultiItems = (model, data) => async dispatch => {
    try {
        dispatch({
            type: REMOVE_SCANNER_ITEM,
            payload: data.item_id
        })
        console.log('running multi remove', data);
        const res = await axios.put(`/api/filteredData/blacklistMany/${model}`, data);
        console.log(res.data)
    } catch (err) {
        console.error(err);
    }
}

//@desc add to selected array from table comp. Used for mass actions on checkbox selected recs
export const setSelected = (data) => async dispatch => {
    try {
        dispatch({
            type: SET_SELECTED_ITEM,
            payload: data
        })
    } catch (err) {
        console.error(err);
    }
}





//CALLS FROM WATCHLIST COMP ALL COMMENTED OUT
export const likeItem = (id) => async dispatch => {
    // try {
    //     dispatch({
    //         type: SET_LOADING
    //     })
    //     const res = await axios.put(`/api/watchlist/like/${id}`);
    //     dispatch({
    //         type: UPDATE_WATCHLIST_ITEM,
    //         payload: res.data
    //     })
    // } catch (err) {
    //     console.error(err);
    // }
}

export const setSelectedCompany = (company) => async dispatch => {
    // try {
    //     dispatch({
    //         type: SET_COMPANY_LOADING
    //     })
    //     const {data} = await axios.get(`/api/company/details/${company.symbol}`);
    //     const news = data.news
    //     const pricing = data.pricing
    //     let selectedCompany = company.company
    //     if (!selectedCompany) {
    //         console.log('no co');
    //         const res = await axios.get(`/api/company/lookup/${company.symbol}`)
    //         selectedCompany = res.data
    //     }

        
        
    //     dispatch({
    //         type: SELECT_COMPANY,
    //         payload: {news: news, pricing: pricing, company: selectedCompany}
    //     })
    // } catch (err) {
    //     console.error(err);
    // }
}

//@desc: similar to above pulled from reporting, will refactor watchlist to this call in future. 
export const addCompanyData = (company) => async dispatch => {
    // console.log('running add com data');
    // try {
    //     dispatch({
    //         type: SET_COMPANY_LOADING
    //     })
    //     const {data} = await axios.get(`/api/company/details/${company.symbol}`);
    //     const news = data.news
    //     const pricing = data.pricing
    //     let selectedCompany = company.company
    //     if (!selectedCompany) {
    //         console.log('no co');
    //         const res = await axios.get(`/api/company/lookup/${company.symbol}`)
    //         selectedCompany = res.data
    //     }
    
    //     dispatch({
    //         type: SELECT_COMPANY,
    //         payload: {news: news, pricing: pricing, company: selectedCompany}
    //     })
    // } catch (err) {
    //     console.error(err);
    // }
}
