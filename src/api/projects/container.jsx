import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { selector } from './config';
import FormWithArrays from './project';

class Container extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // this.props.actions[selector].read();
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('nextProps', nextProps);
        console.log('this.props', this.props);
        console.log('nextState', nextState);
        return true;
    }

    handleChange(event) {
        console.log('this.props', this.props);
        console.log('vent', event.target.value);
    }

    render() {
        // console.log('this.props', this.props);

        // const data = this.props[selector].data;
        // console.log('data', data);

        return (
            <div>
                <FormWithArrays />
            </div>
        );
    }
}

// Container.propTypes = {
//     [selector]: PropTypes.shape({
//         loading: PropTypes.bool.isRequired,
//         selected: PropTypes.shape({}).isRequired,
//         data: PropTypes.shape({}).isRequired // { entities: {}, result: [] }
//     }).isRequired,
//     actions: PropTypes.shape({
//         [selector]: PropTypes.shape({
//             read: PropTypes.func.isRequired,
//             update: PropTypes.func.isRequired,
//             remove: PropTypes.func.isRequired,
//             create: PropTypes.func.isRequired,
//         })
//     }).isRequired
// };

export default Container;
