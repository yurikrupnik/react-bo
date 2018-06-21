import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from './context';
import List from '../../components/List';

const ProjectsConsumer = ({ render }) => (
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

ProjectsConsumer.defaultProps = {
    render: null
};

ProjectsConsumer.propTypes = {
    render: PropTypes.func
};

export default ProjectsConsumer;
