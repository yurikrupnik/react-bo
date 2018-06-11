import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from './context';
import usersApi from './api';

class UsersProvider extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: (global.window && global.window.appData) || [],
            loading: false
        };

        this.load = (params, cb) => {
            return usersApi.fetch(params).then((res) => {
                this.setState(() => {
                    return {
                        data: res
                    };
                }, cb);
            });
        };
    }

    render() {
        const { loading, data } = this.state;
        return (
            <Provider value={{
                data,
                loading,
                fetch: this.load
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
