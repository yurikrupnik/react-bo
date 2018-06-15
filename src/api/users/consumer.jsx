import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from './context';

const DefaultConsumer = (props) => {
    const { loading, data } = props;

    return (
        <div>
            {data.map(val => {
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
    // theme: PropTypes.shape({}).isRequired,
    // toggleTheme: PropTypes.func.isRequired
};

class UsersConsumer extends Component {
    render() {
        const { render } = this.props;
        return (
            <Consumer>
                {(props) => {
                    // if (!props.data.length) {
                    //     props.fetch();
                    // }
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

UsersConsumer.defaultProps = {
    render: null
};

UsersConsumer.propTypes = {
    render: PropTypes.func
};

export default UsersConsumer;
