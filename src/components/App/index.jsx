import React, { Component, createContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Provider from '../../store/container';
import request from 'axios';
import Router from '../Router';
// import routes from './routes';
const apiCall = request.create({
    baseURL: 'http://localhost:5000/',
});

const usersApi = {
    read: (params, cb) => apiCall.get('/api/users', { params })
        .then((res) => {
            const { data } = res;
            if (typeof cb === 'function') {
                return cb(data);
            }
            return data;
        })
};

const projectsApi = {
    read: (params, cb) => apiCall.get('/api/projects', { params })
        .then((res) => {
            const { data } = res;
            if (typeof cb === 'function') {
                return cb(data);
            }
            return data;
        })
};
const { Provider, Consumer } = createContext({
    session: '',
    number: 10
});

// const App = props => (
//     <Router routes={routes} {...props} />
// );

class MainNav extends Component {
    constructor(props) {
        super(props);
        this.state = { session: '' };
    }

    render() {
        if (this.state.session) {
            return (<Redirect to="/register" />);
        }
        return (
            <Consumer>
                {shit => {
                    console.log('shit', shit);

                    return (
                        <header>
                            <div>
                                <div>
                                    <Link to="/">Dashboard1</Link>
                                </div>
                                <div>
                                    <Link to="/about">About</Link>
                                </div>
                                <div>
                                    <Link to="/topics">Topics</Link>
                                </div>
                                <div>
                                    <Link to="/users">Users</Link>
                                </div>
                                <div>
                                    <Link to="/projects">Pojects</Link>
                                </div>
                            </div>
                        </header>
                    );
                }}
            </Consumer>
        );
    }
}
const routes = [
    {
        path: '/',
        component: MainNav,
        key: 'nav',
        getData: () => Promise.all([usersApi.read(), projectsApi.read()])
    },
    // {
    //     path: '/',
    //     component: Dashboard,
    //     key: 'dashboard',
    //     exact: true,
    //     getData: () => projectsApi.read()
    // },
    // {
    //     path: '/register',
    //     component: () => (<div>register</div>),
    //     key: '/register'
    // },
    // {
    //     path: '/about',
    //     component: About,
    //     key: 'about'
    // },
    // {
    //     path: '/topics',
    //     component: Topics,
    //     key: 'topics',
    // },
    // {
    //     path: '/projects',
    //     component: ProjectsLoadableComponent,
    //     key: 'projects',
    //     getData: () => projectsApi.read()
    // },
    // {
    //     path: '/users',
    //     component: UsersLoadableComponent,
    //     key: 'users',
    //     getData: () => usersApi.read()
    // },
    // {
    //     path: '/',
    //     component: () => {
    //         return (<div>footer</div>);
    //     },
    //     key: 'footer'
    // }
    // {
    //     path: '/*',
    //     component: () => <div>bmo natch</div>,
    //     key: 'nun',
    //     exact: true
    // }
];

class AppProvider extends Component {
    // state = {
    //     num: 12
    // };

    constructor(props) {
        super(props);
        this.state = {
            number: 12,
            yebal: 1
        };
    }

    render() {
        return (
            <Provider value="my vakye">
                <Router routes={routes} />
            </Provider>
        );
    }
}

export default AppProvider;

// export { Consumer };
