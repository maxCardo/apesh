import { combineReducers } from 'redux';
import auth from './auth'
import watchlist from './watchlist'
import market from './market'


export default combineReducers({auth, watchlist, market});