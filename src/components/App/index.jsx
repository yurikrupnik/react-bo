import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Material from '../Material';
import Provider from '../../store/container';
import { routes } from './routes';

const MainNav = () => {
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/topics">Topics</Link>
            </li>
            <li>
                <Link to="/users">Users</Link>
            </li>
            <li>
                <Link to="/projects">Pojects</Link>
            </li>
        </ul>
    );
};

const Lyout = props => (
    <div>
        <MainNav />

        <hr />

        {routes.map(route => <Route key={route.key} {...route} />)}
    </div>
);
// BasicExample.propTypes = {
    // routes: PropTypes.shape(PropTypes.array).isRequired
// };
const App = (props) => {
    const { userAgent, initialState } = props;
    // const store = configureStore(initialState);
    // const Root = withReduxStore(withSubRoutes(Header, routes), store);
    return (
        <Material userAgent={userAgent}>
            <Provider initialState={initialState}>
                <Router>
                    <Lyout />
                </Router>
            </Provider>
        </Material>
    );
};

App.propTypes = {
    // routes: PropTypes.shape([]).isRequired,
    initialState: PropTypes.shape({}).isRequired,
    userAgent: PropTypes.string.isRequired
};

export default App;
