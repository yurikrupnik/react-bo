import { combineReducers } from 'redux';
import session from './config/session/reducer';
import users from '../api/users/reducer';
import currency from '../api/currency/reducer';
import positions from '../api/positions/reducer';
import fu from '../api/fu/reducer';

const reducers = {
    session,
    users,
    currency,
    positions,
    fu
    // config: configReducer,
    // api: apiReducer,
    // errors
};

export default combineReducers(reducers);
