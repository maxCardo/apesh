import { SET_LOADING ,SET_WATCHLIST, REMOVE_WATCHLIST_ITEM, UPDATE_WATCHLIST_ITEM, SET_COMPANY_LOADING, SELECT_COMPANY, SET_REPORTING} from '../actions/type'

const initialState = {
    loading: true,
    list: [],
    reporting: [],
    selectedCompany: {
        loading: true,
        details: {}
    }
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch(type){
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_COMPANY_LOADING:
            return {
                ...state,
                selectedCompany:{
                    loading: true,
                    details: {}
                }
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
        case SELECT_COMPANY:
            return {
                ...state,
                selectedCompany: {
                    loading: false,
                    details: payload
                }
            }
        case SET_REPORTING:
            return {
                ...state,
                loading: false,
                reporting: payload
            }        
        
        default:
            return state
    }

}