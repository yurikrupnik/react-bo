import { compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = (global.window &&
// eslint-disable-next-line no-underscore-dangle
    global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
export default composeEnhancers(applyMiddleware(thunk));
