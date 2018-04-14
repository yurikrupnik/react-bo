import { combineReducers } from 'redux';
import session from './config/session/reducer';

const reducers = {
    session,
    // config: configReducer,
    // api: apiReducer,
    // errors
};

export default combineReducers(reducers);
