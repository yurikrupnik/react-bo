import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from './context';
import projectsApi from './api';

class PropjectsProvider extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [], // props.data ||
            loading: false
        };

        this.fetch = (params, cb) => {
            return projectsApi.fetch(params).then((res) => {
                this.setState(() => {
                    return {
                        data: res.data
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
                fetch: this.fetch
            }}
            >
                {this.props.children}
            </Provider>
        );
    }
}
PropjectsProvider.propTypes = {
    children: PropTypes.element.isRequired
};

export default PropjectsProvider;
