import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from './context';

const DefaultConsumer = (props) => {
    const { theme, toggleTheme } = props;
    return (
        <div>
            <button style={{ background: theme.background }} onClick={toggleTheme}>
                clicks
            </button>
        </div>
    );
};

DefaultConsumer.propTypes = {
    theme: PropTypes.shape({}).isRequired,
    toggleTheme: PropTypes.func.isRequired
};

class ThemesConsumer extends Component {
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

ThemesConsumer.defaultProps = {
    render: null
};

ThemesConsumer.propTypes = {
    render: PropTypes.func
};

export default ThemesConsumer;
