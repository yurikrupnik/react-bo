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

class ContainerProvider extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            theme: themes.light,
            data: [],
            loading: false
        };
        //
        this.toggleTheme = () => {
            this.setState(state => ({
                theme:
                    state.theme === themes.dark
                        ? themes.light
                        : themes.dark,
            }));
        };

        this.fetch = (params, cb) => {
            return usersApi.read(params).then((res) => {
                console.log('res', res);
                this.setState(() => {
                    return {
                        data: res
                    };
                }, cb);
            });
        };
    }

    render() {
        const { theme, data } = this.state;
        return (
            <Provider value={{
                data,
                theme,
                toggleTheme: this.toggleTheme
            }} >
                {this.props.children}
            </Provider>
        );
    }
}

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


export default Container;
