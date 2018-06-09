import React, { Component } from 'react';
import request from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Loadable from './Loadable';
import Topics from './Topics/index';
import Dashboard from './Dashboard/index';
import projectsApi from '../api/projects/api';
import usersApi from '../api/users/api';

const ProjectsLoadableComponent = Loadable({
    loader: () => import(/* webpackChunkName: "projects" */ '../api/projects/container'),
});
const UsersLoadableComponent = Loadable({
    loader: () => import(/* webpackChunkName: "users" */ '../api/users/container'),
});

const RegisterLoadableComponent = Loadable({
    loader: () => import(/* webpackChunkName: "register" */ './Register'),
});
const AboutLoadableComponent = Loadable({
    loader: () => import(/* webpackChunkName: "register" */ './About'),
});

const routes = [
    // {
    //     path: '/',
    //     component: MainNav,
    //     key: 'nav',
    //     getData: () => Promise.all([usersApi.read(), projectsApi.read()])
    // },
    {
        path: '/',
        component: Dashboard,
        key: 'dashboard',
        exact: true,
        fetch: () => usersApi.read()
    },
    {
        path: '/register',
        component: RegisterLoadableComponent,
        key: '/register',
        fetch: projectsApi.read
    },
    {
        path: '/about',
        component: AboutLoadableComponent,
        key: 'about',
        // fetch: () => usersApi.read()
    },
    {
        path: '/topics',
        component: Topics,
        key: 'topics',
        fetch: usersApi.read
    },
    {
        path: '/projects',
        component: ProjectsLoadableComponent,
        key: 'projects',
        fetch: () => projectsApi.read()
    },
    {
        path: '/users',
        component: UsersLoadableComponent,
        key: 'users',
        // fetch: () => Promise.all([usersApi.read(), projectsApi.read()])
    }
    // {
    //     path: '/*',
    //     component: () => <div>bmo natch</div>,
    //     key: 'nun',
    //     exact: true
    // }
];

export default routes;
