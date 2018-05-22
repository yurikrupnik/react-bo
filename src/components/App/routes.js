import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Topics from './Topics';

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

const About = () => (
    <div>
        <h2>About</h2>
    </div>
);


class MainNav extends Component {
    constructor(props) {
        super(props);
        console.log('props', props);

        this.state = {};
    }

    render() {
        return (
            <header>
                <ul>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                    <li>
                        <Link to="/projects">Pojects</Link>
                    </li>
                </ul>
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

const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
);
const topicsRoutes = [
    {
        path: '/Topics',
        component: () => (<h3>Please select a topic.</h3>),
        exact: true,
        key: '/Topics/Topics'
    },
    {
        path: '/Topics/:topicId',
        component: Topic,
        exact: true,
        key: '/Topics/:Topics'
    }
];

const Routes = (props) => {
    const { children, routes } = props;
    return (
        <div>
            {children}
            <div>{routes.map(route => <Route key={route.key} {...route} />)}</div>
        </div>
    );
};


const routes = [
    {
        path: '/',
        component: MainNav,
        // render: (props) => {
        //     console.log('props', props);
        //     return props.match.url === '/' ? (<Redirect to="/users" />) : (<MainNav />);
        // },
        key: 'nav',
        // exact: true
    },
    {
        path: '/dashboard',
        component: () => (<div>dasboaard here</div>),
        key: 'dashboard'
    },
    {
        path: '/about',
        component: About,
        key: 'about'
    },
    {
        path: '/topics',
        component: (props) => {
            console.log('props', props);
            const { match } = props;
            const data = [
                {
                    value: 'props-v-state',
                    title: 'Props v. State'
                },
                {
                    value: 'components',
                    title: 'Components'
                },
                {
                    value: 'rendering',
                    title: 'Rendering with React'
                }
            ];
            return (
                <div>
                    <h2>Topics</h2>
                    <Routes routes={topicsRoutes}>
                        <ul>
                            {data.map(val => (
                                <li key={val.value}>
                                    <Link to={`${match.url}/${val.value}`}>{val.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </Routes>
                </div>
            );
        },
        key: 'Topics',
    },
    {
        path: '/projects',
        component: (props) => {
            console.log('props', props);
            return <ProjectsLoadableComponent/>;
        },
        key: 'projects'
    },
    {
        path: '/users',
        component: () => <UsersLoadableComponent/>,
        key: 'users'
    }
];

export default routes;
