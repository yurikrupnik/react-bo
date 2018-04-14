import { SET_SESSION } from './actions';

export default (state = '', action) => {
    switch (action.type) {
    case SET_SESSION:
        return action.payload;
    // case RESET_SESSION:
    //     return '';
    default:
        return state;
    }
};
