import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Provider from '../../store/container';
import Router from '../Router';
import routes from './routes';

const App = ({ initialState }) => (
    <Provider initialState={initialState}>
        <BrowserRouter>
            <Router routes={routes} />
        </BrowserRouter>
    </Provider>
);

App.propTypes = {
    initialState: PropTypes.shape({}).isRequired
};

export default App;
