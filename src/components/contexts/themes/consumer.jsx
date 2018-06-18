import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from './context';
import DefaultConsumer from './defaultButton';

function ThemesConsumer({ render, children }) {
    // console.log('children', children);
    // const Child = children;
    return (
        <Consumer>
            {(props) => {
                // const Child = React.createElement('div', props, children);
                // console.log('Child', Child);

                if (typeof render === 'function') {
                    return render(props);
                } else if (children) {
                    // return <Child />;
                }
                return (
                    <DefaultConsumer {...props} />
                );
            }}
        </Consumer>
    );
}

ThemesConsumer.defaultProps = {
    render: null
};

ThemesConsumer.propTypes = {
    render: PropTypes.func
};

export default ThemesConsumer;
