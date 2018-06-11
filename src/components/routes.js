import React, { Component } from 'react';
import Loadable from './Loadable';
import Topics from './Topics/index';
import Dashboard from './Dashboard/index';
import usersApi from '../api/users/api';
import projectsApi from '../api/projects/api';

const RegisterLoadableComponent = Loadable({
    loader: () => import(/* webpackChunkName: "register" */ './Register'),
});

const ProjectsLoadableComponent = Loadable({
    loader: () => import(/* webpackChunkName: "projects" */ '../api/projects/container'),
});
const UsersLoadableComponent = Loadable({
    loader: () => import(/* webpackChunkName: "users" */ '../api/users/consumer'),
});

const AboutLoadableComponent = Loadable({
    loader: () => import(/* webpackChunkName: "about" */ './About'),
});

const routes = [
    {
        path: '/',
        component: Dashboard,
        key: 'dashboard',
        exact: true,
        fetch: () => usersApi.fetch()
    },
    {
        path: '/register',
        component: RegisterLoadableComponent,
        key: '/register',
        fetch: () => projectsApi.fetch()
    },
    {
        path: '/about',
        component: AboutLoadableComponent,
        key: 'about',
        fetch: () => usersApi.fetch()
    },
    {
        path: '/topics',
        component: Topics,
        key: 'topics',
        fetch: () => usersApi.fetch()
    },
    {
        path: '/projects',
        component: ProjectsLoadableComponent,
        key: 'projects',
        fetch: () => projectsApi.fetch()
    },
    {
        path: '/users',
        component: UsersLoadableComponent,
        key: 'users',
        fetch: () => usersApi.fetch()
    }
];

export default routes;
