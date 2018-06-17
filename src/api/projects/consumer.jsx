import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from './context';

const DefaultConsumer = (props) => {
    const { loading, data } = props;

    return (
        <div>
            {data.map((val) => {
                return (
                    <div key={val._id}>
                        <h2>users defauly consumer</h2>
                        <div >
                            name: {val.name}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

DefaultConsumer.propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf().isRequired
};

class ProjectsConsumer extends Component {
    render() {
        const { render } = this.props;
        return (
            <Consumer>
                {(props) => {
                    if (typeof render === 'function') {
                        return render(props);
                    }
                    return (
                        <DefaultConsumer {...props} />
                    );
                }}
            </Consumer>
        );
    }
}

ProjectsConsumer.defaultProps = {
    render: null
};

ProjectsConsumer.propTypes = {
    render: PropTypes.func
};

export default ProjectsConsumer;
