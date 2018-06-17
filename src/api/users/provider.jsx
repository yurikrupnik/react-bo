import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from './context';
import usersApi from './api';

class UsersProvider extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: props.data || [],
            loading: false,
            selected: {}
        };

        this.fetch = (params, cb) => {
            return this.setState((prevState) => {
                return { loading: !prevState.loading };
            }, () => {
                return usersApi.fetch(params).then((data) => {
                    return this.setState((prevState) => {
                        return { data, loading: !prevState.loading };
                    }, cb);
                });
            });
        };
    }

    render() {
        const { loading, data } = this.state;
        return (
            <Provider value={{
                data,
                loading,
                fetch: this.fetch
            }}
            >
                {this.props.children}
            </Provider>
        );
    }
}
UsersProvider.propTypes = {
    children: PropTypes.element.isRequired
};

export default UsersProvider;
