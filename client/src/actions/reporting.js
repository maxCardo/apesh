import { SET_LOADING, SET_REPORTING, SET_COMPANY_LOADING, SELECT_COMPANY} from './type'
import axios from 'axios'


export const getReporting = () => async dispatch => {
    try {
        const res = await axios.get(`/api/watchlist/reporting`);
        console.log(res);
        dispatch({
            type: SET_REPORTING,
            payload: res.data
        })
    } catch (err) {
        console.error(err);
    }
}