import { SET_IDXS} from './type'
import axios from 'axios'



export const getIndexData = () => async dispatch => {
    try {
        const res = await axios.get(`/api/market/idxs`);
        dispatch({
            type: SET_IDXS,
            payload: res.data
        })
    } catch (err) {
        console.error(err);
    }
}



