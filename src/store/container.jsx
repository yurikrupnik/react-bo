import React from 'react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import configStore from './index';

function Provider(props) {
    return (
        <ReduxProvider store={configStore({})}>
            {props.children}
        </ReduxProvider>
    );
}

Provider.propTypes = {
    children: PropTypes.element.isRequired
};

export default Provider;
