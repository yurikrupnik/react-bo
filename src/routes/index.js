import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

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

const Topic = (props) => {
    console.log('props.match', props.match);
    return (
        <div>
            <h3>{props.match.params.topicId}</h3>
        </div>
    );
};

const Topics = ({ match }) => {
    console.log('match', match);
    return (
        <div>
            <h2>Topics</h2>
            <ul>
                <li>
                    <Link to={`${match.url}/rendering`}>Rendering with React</Link>
                </li>
                <li>
                    <Link to={`${match.url}/components`}>Components</Link>
                </li>
                <li>
                    <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
                </li>
            </ul>
            <Route
                path={`${match.url}/:topicId`}
                component={Topic}
            />
            <Route
                path={match.url}
                render={() => <h3>Please select a topic.</h3>}
            />
        </div>
    );
};


function Loading() {
    return <div>Loading...</div>;
}

const LoadableComponent = Loadable({
    loader: () => import(/* webpackChunkName: "app" */ '../component/App'),
    loading: Loading,
});
const ProjectsLoadableComponent = Loadable({
    loader: () => import(/* webpackChunkName: "projects" */ '../api/projects/container'),
    loading: Loading,
});
const UsersLoadableComponent = Loadable({
    loader: () => import(/* webpackChunkName: "users" */ '../api/users/container'),
    loading: Loading,
});

const routes = [
    {
        path: '/',
        component: () => <LoadableComponent />,
        exact: true,
        key: 'main'
    },
    {
        path: '/about',
        component: About,
        exact: true,
        key: 'about'
    },
    // {
    //     path: '/topics',
    //     component: Topics,
    //     exact: true,
    //     key: 'topics',
    //     // routes: [
    //     //     {
    //     //         path: '/topics/:topicId',
    //     //         component: About
    //     //     }
    //     // ]
    // },
    {
        path: '/projects',
        component: (props) => {
            console.log('props', props);
            return <ProjectsLoadableComponent />;
        },
        exact: true,
        key: 'projects'
    },
    {
        path: '/users',
        component: () => <UsersLoadableComponent />,
        exact: true,
        key: 'users'
    },
];

export default routes;
