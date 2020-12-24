import { SET_LOADING ,SET_WATCHLIST, REMOVE_WATCHLIST_ITEM, UPDATE_WATCHLIST_ITEM} from '../actions/type'

const initialState = {
    loading: true,
    list: []
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch(type){
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_WATCHLIST:
            return {
                ...state,
                list: payload,
                loading: false
            }
        case REMOVE_WATCHLIST_ITEM:
            return {
                ...state,
                list: state.list.filter(item => item._id != payload),
                loading: false
            }
        case UPDATE_WATCHLIST_ITEM:
            return {
                ...state,
                list: state.list.map(item => item._id === payload._id ? payload : item),
                loading: false
            }    
        
        default:
            return state
    }

}