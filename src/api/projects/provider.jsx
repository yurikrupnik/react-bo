import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from './context';
import projectsApi from './api';

class ProjectsProvider extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: props.data || [],
            loading: false,
            selected: {}
        };

        this.setSelected = (item) => {
            this.setState(() => ({ selected: item }));
        };

        this.clearSelected = () => {
            this.setState(() => ({ selected: {} }));
        };

        this.fetch = (params, cb) => {
            return this.setState((prevState) => {
                return { loading: !prevState.loading };
            }, () => {
                return projectsApi.fetch(params).then((data) => {
                    return this.setState((prevState) => {
                        return { data, loading: !prevState.loading };
                    }, cb);
                });
            });
        };
    }

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

ProjectsProvider.defaultProps = {
    data: []
};

ProjectsProvider.propTypes = {
    children: PropTypes.element.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({}))
};

export default ProjectsProvider;
