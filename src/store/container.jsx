import React from 'react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import configStore from './index';

const store = configStore();

function Provider(props) {
    const { children, initialState } = props;
    console.log('initialState', initialState);

    return (
        <ReduxProvider store={store}>
            {children}
        </ReduxProvider>
    );
}

Provider.propTypes = {
    children: PropTypes.element.isRequired,
    initialState: PropTypes.shape({}).isRequired
};

export default Provider;
