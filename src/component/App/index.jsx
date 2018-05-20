import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Container from '../../../api/projects/container';
import { Router, Route, Switch } from 'react-router';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            log: 'logging',
            lazyLoadedComponent: <div>lol</div>
        };
    }

    render() {
        const { userAgent } = this.props;
        const { log } = this.state;
        // return <Container />;
        return (
            <div>hello from reacr <span>{userAgent}: {log}</span>
                <div>{this.state.lazyLoadedComponent}</div>
            </div>
        );
    }
}

App.propTypes = {
    userAgent: PropTypes.string.isRequired,
};
