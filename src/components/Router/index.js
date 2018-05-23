import React from 'react';
import PropTypes from 'prop-types';

const Routes = (props) => {
    const { children, routes } = props;
    return (
        <div>
            {children}
            <div>{routes.map(route => <Route key={route.key} {...route} />)}</div>
        </div>
    );
};

Routes.propTypes = {
    children: PropTypes.element.isRequired,
    routes: PropTypes.shape()
};

export default Routes;
