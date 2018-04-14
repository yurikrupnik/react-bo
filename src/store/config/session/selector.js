import { bindActionCreators } from 'redux';
import * as actions from './actions';

function mapToProps(state, ownProps) {
    return state.session;
}

function dispatchActions(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export {
    mapToProps,
    dispatchActions
};
