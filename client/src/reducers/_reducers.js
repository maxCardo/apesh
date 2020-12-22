import { combineReducers } from 'redux';
import auth from './auth'
import watchlist from './watchlist'


export default combineReducers({auth, watchlist});