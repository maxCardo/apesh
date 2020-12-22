import {SET_WATCHLIST} from '../actions/type'

const initialState = {
    loading: true,
    watchlist: []
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch(type){
        case SET_WATCHLIST:
            return {
                ...state,
                watchlist: payload,
                loading: false
            }
        default:
            return state
    }

}