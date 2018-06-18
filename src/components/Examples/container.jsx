import React, { Component } from 'react';

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lo: false
        };
    }

    render() {
        return (
            <div>hello from container</div>
        );
    }
}

export default Container;
