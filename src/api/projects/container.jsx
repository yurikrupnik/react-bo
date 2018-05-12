import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import * as actions from './actions';
import { Form, Text } from 'react-form';
import { mapToProps, dispatchActions } from './selector';
import { selector } from './config';
// console.log('read', read);
// console.log('shit', shit);

class FormWithArrays extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log('this.state', this.state);

        return (
            <div>
                <Form
                    onSubmit={submittedValues => this.setState({ submittedValues })}>
                    {formApi => (
                        <form onSubmit={formApi.submitForm} id="form3">
                            <label htmlFor="firstName2">First name</label>
                            <Text field="firstName" id="firstName2" />
                            <label htmlFor="friend1">Friend1</label>
                            <Text field={['friends', 0]} id="friend1" />
                            <label htmlFor="friend2">Friend2</label>
                            <Text field={['friends', 1]} id="friend2" />
                            <label htmlFor="friend3">Friend3</label>
                            <Text field={['friends', 2]} id="friend3" />
                            <button type="submit" className="mb-4 btn btn-primary">Submit</button>
                        </form>
                    )}
                </Form>
            </div>
        );
    }
}

class Container extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.actions[selector].read();
    }

    handleChange(event) {
        console.log('vent', event.target.value);

    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('nextProps', nextProps);
        console.log('this.props', this.props);
        console.log('nextState', nextState);
        return true;
    }

    render() {
        // console.log('this.props', this.props);

        const data = this.props[selector].data;
        // console.log('data', data);

        return (
            <div>
                <FormWithArrays />
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
