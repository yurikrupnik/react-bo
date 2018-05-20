import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import * as actions from './actions';
import { mapToProps, dispatchActions } from './selector';
import { selector } from './config';
// console.log('read', read);
// console.log('shit', shit);

class Container extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.actions[selector].read();
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('nextProps', nextProps);
        console.log('this.props', this.props);
        console.log('nextState', nextState);
        return true;
    }

    handleChange(event) {
        console.log('this', this.props);
        console.log('vent', event.target.value);
    }

    render() {
        // console.log('this.props', this.props);

        // const data = this.props[selector].data;
        // console.log('data', data);

        return (
            <div>
                users container
            </div>
        );
    }
}

Container.propTypes = {
    [selector]: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        selected: PropTypes.shape({}).isRequired,
        data: PropTypes.shape({}).isRequired // { entities: {}, result: [] }
    }).isRequired,
    actions: PropTypes.shape({
        [selector]: PropTypes.shape({
            read: PropTypes.func.isRequired,
            update: PropTypes.func.isRequired,
            remove: PropTypes.func.isRequired,
            create: PropTypes.func.isRequired,
        })
    }).isRequired
};


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
