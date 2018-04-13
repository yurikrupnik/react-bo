import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        return (<div>hello from reacr <span>{userAgent}: {log}</span></div>);
    }
}

App.propTypes = {
    userAgent: PropTypes.string.isRequired,
};

// export default App;
