import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from './context';
// import UsersProvider from "./provider";

const DefaultConsumer = (props) => {
    const { loading, data } = props;
    // console.log('props', props);

    return (
        <div>
            {data.map(val => {
                return (

                    <div key={val._id}>
                        sdas
                        name: {val.name}
                    </div>
                );
            })}
        </div>
    );
};

DefaultConsumer.propTypes = {
    // theme: PropTypes.shape({}).isRequired,
    // toggleTheme: PropTypes.func.isRequired
};

class UsersConsumer extends Component {
    render() {
        const { render } = this.props;
        return (
            <Consumer>
                {(props) => {
                    if (typeof render === 'function') {
                        return render(props);
                    }
                    if (!props.data.length) {
                        props.fetch();
                    }
                    return (
                        <DefaultConsumer {...props} />
                    );
                }}
            </Consumer>
        );
    }
}

UsersConsumer.defaultProps = {
    render: null
};

UsersConsumer.propTypes = {
    render: PropTypes.func
};

export default UsersConsumer;
