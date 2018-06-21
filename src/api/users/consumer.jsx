import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from './context';
import List from '../../components/List';

const UsersConsumer = ({ render }) => (
    <Consumer>
        {(props) => {
            if (typeof render === 'function') {
                return render(props);
            }
            return (
                <List {...props} />
            );
        }}
    </Consumer>
);

UsersConsumer.defaultProps = {
    render: null
};

UsersConsumer.propTypes = {
    render: PropTypes.func
};

export default UsersConsumer;
