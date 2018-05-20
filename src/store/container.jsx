import React from 'react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import configStore from './index';

function Provider(props) {
    const { children, initState } = props;
    return (
        <ReduxProvider store={configStore(initState || {})}>
            {children}
        </ReduxProvider>
    );
}

Provider.propTypes = {
    children: PropTypes.element.isRequired,
    initState: PropTypes.shape({}).isRequired
};

export default Provider;
