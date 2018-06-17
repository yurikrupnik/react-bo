import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';

const Loading = (props) => {
    if (props.error) {
        return <div>Error! <button onClick={props.retry}>Retry</button></div>;
    } else if (props.timedOut) {
        return <div>Taking a long time... <button onClick={props.retry}>Retry</button></div>;
    } else if (props.pastDelay) {
        return <div>Loading...</div>;
    }
    return null;
};

Loading.defaultProps = {
    error: '',
    pastDelay: '',
    timedOut: '',
    retry: () => {}
};

Loading.propTypes = {
    error: PropTypes.shape({}),
    pastDelay: PropTypes.bool,
    timedOut: PropTypes.bool,
    retry: PropTypes.func
};

export default function (opts) {
    return Loadable(Object.assign({
        loading: Loading,
        // delay: 200,
        // timeout: 10,
    }, opts));
}
