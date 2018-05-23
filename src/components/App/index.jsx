import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import { Alert } from 'react-bootstrap';
// import Material from '../Material';
// import Button from '@material-ui/core/Button';
import Provider from '../../store/container';
import routes from './routes';

const App = ({ initialState }) => (
    <Provider initialState={initialState}>
        <Router>
            <div>{routes.map(route => <Route key={route.key} {...route} />)}</div>
        </Router>
    </Provider>
);

App.propTypes = {
    initialState: PropTypes.shape({}).isRequired,
    // userAgent: PropTypes.string.isRequired
};

export default App;
