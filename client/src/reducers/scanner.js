import { SET_LOADING ,SET_SCANNER, REMOVE_SCANNER_ITEM, UPDATE_SCANNER_ITEM, SET_FILTER_OPTIOINS} from '../actions/type'

const initialState = {
    loading: true,
    list: [],
    filterOptions: []
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch(type){
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }

        case SET_SCANNER:
            return {
                ...state,
                list: payload,
                loading: false
            }
        case REMOVE_SCANNER_ITEM:
            return {
                ...state,
                list: state.list.filter(item => item._id != payload),
                loading: false
            }
        case UPDATE_SCANNER_ITEM:
            return {
                ...state,
                list: state.list.map(item => item._id === payload._id ? payload : item),
                loading: false
            }

        case SET_FILTER_OPTIOINS:
            return {
                ...state, 
                filterOptions: payload,
            }
                       
        default:
            return state
    }

}