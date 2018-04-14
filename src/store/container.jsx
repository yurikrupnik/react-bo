import React from 'react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import configStore from './index';

function Provider(props) {
    const { children } = props;
    return (
        <ReduxProvider store={configStore({})}>
            {children}
        </ReduxProvider>
    );
}

Provider.propTypes = {
    children: PropTypes.element.isRequired
};

export default Provider;
