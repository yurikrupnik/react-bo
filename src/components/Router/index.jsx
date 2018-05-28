import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const Routes = (props) => {
    const { children, routes } = props;
    return (
        <div>
            {children}
            {routes.map(route => <Route key={route.key} {...route} />)}
        </div>
    );
};

Routes.defaultProps = {
    children: null
};

Routes.propTypes = {
    children: PropTypes.element,
    routes: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string.isRequired
    })).isRequired
};

export default Routes;
