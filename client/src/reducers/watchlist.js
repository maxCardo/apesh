import {SET_WATCHLIST} from '../actions/type'

const initialState = {
    loading: true,
    list: []
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch(type){
        case SET_WATCHLIST:
            return {
                ...state,
                list: payload,
                loading: false
            }
        default:
            return state
    }

}