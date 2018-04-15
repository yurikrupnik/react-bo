import { bindActionCreators } from 'redux';
import * as actions from './actions';

function mapToProps(state) {
    return state.session;
}

function dispatchActions(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export {
    mapToProps,
    dispatchActions
};
