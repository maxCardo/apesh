import { SET_LOADING, SET_SCANNER, REMOVE_SCANNER_ITEM, UPDATE_SCANNER_ITEM, SET_FILTER_OPTIOINS } from './type'
import axios from 'axios'


//@desc: test call returns 10 records to fee table
export const getScanner = () => async dispatch => {
    try {
        const res = await axios.get(`/api/scanner`);
        dispatch({
            type: SET_SCANNER,
            payload: res.data
        })
    } catch (err) {
        console.error(err);
    }
}

//@desc: Loads filter options from dataset 
export const getFilterOptions = (data) => async dispatch => {
    try {
        const res = await axios.post(`/api/scanner/filterOptions`, data);
        dispatch({
            type: SET_FILTER_OPTIOINS,
            payload: res.data
        })
    } catch (err) {
        console.error(err);
    }
}

//@desc: reload component with filterd data set on selcted of saved or new filter
export const fetchFilteredData = (filters, blacklist) => async dispatch => {
    try {
        //     dispatch({
        //     type: SET_LOADING
        // })
        //setLoading(true)
        const data = {filters, blacklist}
        console.log('runnning fetchFilterd data from actions: ', data)
        const res = await axios.post(`/api/scanner/loadFilter`, data);
        console.log('filterRes: ', res)
        //const listings = res.data.record;
        //const appliedFilters = res.data.filters
        //setFilters(appliedFilters)
        //setListings(listings)
        //setLoading(false)
    } catch (err) {
        console.error(err);
    }
    
    
    
}




//CALLS FROM WATCHLIST COMP ALL COMMENTED OUT

export const removeItem = (id) => async dispatch => {
    // try {
    //     console.log('running remove');
    //     dispatch({
    //         type: SET_LOADING
    //     })
    //     const res = await axios.put(`/api/watchlist/removeItem/${id}`);
    //     console.log(res.data)
    //     dispatch({
    //         type: REMOVE_WATCHLIST_ITEM,
    //         payload: res.data
    //     })
    // } catch (err) {
    //     console.error(err);
    // }
}

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
