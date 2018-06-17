import React, { Component } from 'react';
import ProjectsConsumer from '../../api/projects/consumer';

class SemiContainer extends Component {
    componentDidMount() {
        this.props.fetch();
    }
    render() {
        const { data, loading } = this.props;
        return (
            <div>
                {loading ? <div style={{ background: 'red' }}>loading...</div> : data.map((v) => {
                    return (
                        <div key={v._id}>
                            <div>name: {v.name}</div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

class Container extends Component {
    render() {
        return (
            <div>
                <h2>Projects</h2>
                <ProjectsConsumer render={(props) => {
                    return <SemiContainer {...props} />;
                }}
                />
            </div>
        );
    }
}

export default Container;
