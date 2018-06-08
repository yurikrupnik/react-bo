import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Provider from '../../store/container';
import Router from '../Router';
import routes from './routes';

const App = ({ initialState }) => (
    <Provider initialState={initialState}>
        <React.Fragment>
            <CssBaseline />
            <Router routes={routes} />
        </React.Fragment>
    </Provider>
);

App.propTypes = {
    initialState: PropTypes.shape({}).isRequired
};

export default App;
