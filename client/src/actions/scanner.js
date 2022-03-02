import { SET_LOADING, SET_SCANNER, REMOVE_SCANNER_ITEM, UPDATE_SCANNER_ITEM, SET_FILTER_OPTIOINS, SET_FILTER, SET_SELECTED_FILTER, SET_SAVED_FILTERS } from './type'
import {createErrorAlert} from "./alert";
import axios from 'axios'
import FileDownload from 'js-file-download'


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


//new customr componenet actions

//@desc Export data to CSV
export const exportCSV = (data) => async dispatch => {
    try {
        // dispatch({
        //     type: SET_LOADING
        // })
        const res = await axios.post(`/api/scanner/exportCSV`, data);
        FileDownload(res.data, 'export.csv')    
    } catch (err) {
        console.error(err);
    }
}

