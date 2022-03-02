import { combineReducers } from 'redux';
import auth from './auth'
import alert from './alert';
import watchlist from './watchlist'
import market from './market'
import filteredData from './filteredData';


export default combineReducers({auth, alert, watchlist, market, filteredData});