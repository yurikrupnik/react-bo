import React from 'react';
import PropTypes from 'prop-types';

const NoMatch = ({ location }) => (
    <div>
        <h3>No match for <code>{location.pathname}</code></h3>
    </div>
);

NoMatch.propTypes = {
    location: PropTypes.shape({}).isRequired
};

export default NoMatch;
