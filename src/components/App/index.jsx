import React, { Fragment } from 'react';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Provider as ThemesProvider } from '../contexts/themes';
import DataProviders from '../../api/dataProvider';
import Layout from './layout';

const ConfigProviders = props => (
    <Fragment>
        <ThemesProvider>
            {props.children}
        </ThemesProvider>
    </Fragment>
);

ConfigProviders.propTypes = {
    children: PropTypes.element.isRequired
};


const App = (props) => {
    const { routes } = props;
    const Router = global.window ? BrowserRouter : StaticRouter;
    return (
        <DataProviders>
            <ConfigProviders>
                <Router>
                    <Layout routes={routes} />
                </Router>
            </ConfigProviders>
        </DataProviders>
    );
};

App.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default App;
