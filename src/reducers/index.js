import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import timers from './timers';

export default combineReducers({
    routing: routerReducer,
    timers
})