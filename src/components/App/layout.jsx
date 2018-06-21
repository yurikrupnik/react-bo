import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Nav from './Nav';

const Layout = (props) => {
    const { routes } = props;
    return (
        <Fragment>
            <Nav routes={routes} />
            {routes.map(route => <Route key={route.key} {...route} />)}
            <div>default footer</div>
        </Fragment>
    );
};

Layout.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Layout;
