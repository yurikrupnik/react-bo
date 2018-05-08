import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import * as actions from './actions';
import { mapToProps, dispatchActions } from './selector';
import { selector } from './config';
// console.log('read', read);
// console.log('shit', shit);

class Container extends Component {
    // constructor(props) {
    //     super(props);
    // }

    // static propTypes = {
        // actions: PropTypes.shape({
        //     read: PropTypes.func,
        //     // dodne: PropTypes.func
        // }).isRequired
    // };

    componentDidMount() {
        this.props.actions[selector].read();
    }

    render() {
        return (
            <div>hello</div>
        );
    }
}

function combinedMapToProps(state) {
    return {
        [selector]: mapToProps(state)
    };
}

function combinedActions(dispatch) {
    return {
        actions: {
            [selector]: dispatchActions(dispatch)
        }
    };
}

export default connect(combinedMapToProps, combinedActions)(Container);
