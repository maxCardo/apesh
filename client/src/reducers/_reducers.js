import { combineReducers } from 'redux';
import auth from './auth'
import watchlist from './watchlist'
import market from './market'
import scanner from './scanner';


export default combineReducers({auth, watchlist, market, scanner});