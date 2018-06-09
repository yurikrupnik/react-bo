import React, { Component, createContext } from 'react';
// import { connect } from 'react-redux';
import request from 'axios';
import PropTypes from 'prop-types';
// import * as actions from './actions';
// import { mapToProps, dispatchActions } from './selector';
import { selector, url } from './config';
// console.log('read', read);
// console.log('shit', shit);
const {Provider, Consumer} = createContext({});

const themes = {
    light: {
        foreground: '#000000',
        background: '#eeeeee',
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
    },
};

export const ThemeContext = createContext(themes.dark);

const api = {
    read: (params, cb) => request.get(`${'/api'}${url}`, { params }).then(cb),
    delete: (id, cb) => request.delete(`${url}/${id}`).then(cb),
    create: (body, cb) => request.post(url, body).then(cb),
    update: (body, cb) => request.post(url, body).then(cb)
};

class Container extends Component {
    constructor(props) {
        super(props);
        // api.read({}, (res) => {
        //     this.state = { data: res };
        // });

        this.handleChange = this.handleChange.bind(this);
        this.do = this.do.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('nextProps', nextProps);
        console.log('this.props', this.props);
        console.log('nextState', nextState);
        return true;
    }

    do(data) {
        this.setState(() => ({ data }));
    }

    handleChange(event) {
        console.log('this', this.props);
        console.log('vent', event.target.value);
    }

    render() {
        // console.log('this.props', this.props);

        // const data = this.props[selector].data;
        // console.log('data', data);

        console.log('this.props', this.props);
        console.log('this.state', this.state);

        return (
            <div>
                users container
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
