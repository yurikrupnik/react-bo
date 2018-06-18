import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from './context';
import List from '../../components/List';

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
                        <List {...props} />
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
