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
            console.log('params', params); // eslint-disable-line no-console
            return this.setState((prevState) => {
                console.log('prevState', prevState); // eslint-disable-line no-console
                return { loading: !prevState.loading };
            }, (a) => {
                console.log('a', a); // eslint-disable-line no-console
                return projectsApi.fetch(params).then((data) => {
                    console.log('data', data); // eslint-disable-line no-console
                    return this.setState((prevState) => {
                        console.log('prevState', prevState); // eslint-disable-line no-console
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

ProjectsProvider.defaultProps = {
    data: []
};

ProjectsProvider.propTypes = {
    children: PropTypes.element.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({}))
};

export default ProjectsProvider;
