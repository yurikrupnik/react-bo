import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Container from '../../../api/projects/container';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            log: 'logging',
        };
    }

    render() {
        const { userAgent } = this.props;
        const { log } = this.state;
        // return <Container />;
        return (<div>hello from reacr <span>{userAgent}: {log}</span></div>);
    }
}

App.propTypes = {
    userAgent: PropTypes.string.isRequired,
};
