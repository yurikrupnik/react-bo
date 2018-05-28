import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import { Route, Link, Redirect } from 'react-router-dom';
import Topics from './components/Topics';
// import Router from '../Router';

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
                        <Link to="/">Dashboard</Link>
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

// const LoadableComponent = Loadable({
//     loader: () => import(/* webpackChunkName: "app" */ '../component/App'),
//     loading: Loading,
// });
function Loading(props) {
    if (props.error) {
        return <div>Error! <button onClick={props.retry}>Retry</button></div>;
    } else if (props.timedOut) {
        return <div>Taking a long time... <button onClick={props.retry}>Retry</button></div>;
    } else if (props.pastDelay) {
        return <div>Loading...</div>;
    } else {
        return null;
    }
}

const ProjectsLoadableComponent = Loadable({
    loader: () => import(/* webpackChunkName: "projects" */ '../../api/projects/container'),
    loading: Loading,
});
const UsersLoadableComponent = Loadable({
    loader: () => import(/* webpackChunkName: "users" */ '../../api/users/container'),
    loading: Loading,
});


const routes = [
    {
        path: '/',
        component: MainNav,
        key: 'nav'
    },
    {
        path: '/',
        component: () => (<div>dasboaard here</div>),
        key: 'dashboard',
        exact: true
    },
    {
        path: '/register',
        component: () => (<div>register</div>),
        key: '/register'
    },
    {
        path: '/about',
        component: About,
        key: 'about'
    },
    {
        path: '/topics',
        component: Topics,
        key: 'topics',
    },
    {
        path: '/projects',
        component: ProjectsLoadableComponent,
        key: 'projects'
    },
    {
        path: '/users',
        component: UsersLoadableComponent,
        key: 'users'
    },
    {
        path: '/*',
        component: () => <div>bmo natch</div>,
        key: 'nun',
        exact: true
    }
];

export default routes;
