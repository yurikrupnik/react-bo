import React from 'react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import configStore from './index';

function Provider(props) {
    const { children, initialState } = props;
    return (
        <ReduxProvider store={configStore(initialState)}>
            {children}
        </ReduxProvider>
    );
}

Provider.propTypes = {
    children: PropTypes.element.isRequired,
    initialState: PropTypes.shape({}).isRequired
};

export default Provider;
