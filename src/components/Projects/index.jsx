import React, { Component } from 'react';
import ProjectsConsumer from '../../api/projects/consumer';

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h2>Projects</h2>
                <ProjectsConsumer />
            </div>
        );
    }
}

export default Container;
