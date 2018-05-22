import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Material from '../Material';
import Provider from '../../store/container';
import routes from './routes';

const App = ({ userAgent, initialState }) => (
    <Material userAgent={userAgent}>
        <Provider initialState={initialState}>
            <Router>
                <div>
                    <div>{routes.map(route => <Route key={route.key} {...route} />)}</div>
                </div>
            </Router>
        </Provider>
    </Material>
);

App.propTypes = {
    initialState: PropTypes.shape({}).isRequired,
    userAgent: PropTypes.string.isRequired
};

export default App;
