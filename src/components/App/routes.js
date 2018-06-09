import React, { Component } from 'react';
import request from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Loadable from '../Loadable';
import Topics from './components/Topics';
import Dashboard from './components/Dashboard';
// import { Consumer } from './index';

const About = () => (
    <div>
        <h2>About</h2>
    </div>
);

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
    }
}

const ProjectsLoadableComponent = Loadable({
    loader: () => import(/* webpackChunkName: "projects" */ '../../api/projects/container'),
});
const UsersLoadableComponent = Loadable({
    loader: () => import(/* webpackChunkName: "users" */ '../../api/users/container'),
});
//
// class Api {
//     constructor(url) {
//         this.request = request.create({
//             baseURL: 'http://localhost:5000/',
//             url
//         });
//     }
//
//     read() {
//         this.request.get();
//     }
// }
//
// const Ap = new Api('/api/users');
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

export default routes;
