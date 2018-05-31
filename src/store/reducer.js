import { combineReducers } from 'redux';
import session from './config/session/reducer';
import users from '../api/users/reducer';
import projects from '../api/projects/reducer';

const reducers = {
    session,
    users,
    projects,
    // config: configReducer,
    // api: apiReducer,
    // errors
};

export default combineReducers(reducers);
