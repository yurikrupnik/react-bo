import { bindActionCreators } from 'redux';
import * as actions from './actions';
import { selector } from './config';

const createSelectorByName = name => state => state[name];

const mapToProps = createSelectorByName(selector);

const dispatchActions = dispatch => bindActionCreators(actions, dispatch);

export { mapToProps, dispatchActions };
