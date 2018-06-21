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
            selected: null
        };

        this.setSelected = (selected) => {
            this.setState(() => ({ selected }));
        };

        this.clearSelected = () => {
            this.setState(() => ({ selected: null }));
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

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.state.data !== nextState.data;
    // }

    render() {
        const { loading, data, selected } = this.state;
        return (
            <Provider value={{
                data,
                loading,
                selected,
                fetch: this.fetch,
                setSelected: this.setSelected,
                clearSelected: this.clearSelected
            }}
            >
                {this.props.children}
            </Provider>
        );
    }
}

UsersProvider.defaultProps = {
    data: []
};
UsersProvider.propTypes = {
    children: PropTypes.element.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({}))
};

export default UsersProvider;
