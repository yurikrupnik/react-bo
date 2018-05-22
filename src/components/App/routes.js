import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Topics from './topics';

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
        return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
    } else if (props.timedOut) {
        return <div>Taking a long time... <button onClick={ props.retry }>Retry</button></div>;
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
        path: '/topics',
        component: () => (<h3>Please select a topic.</h3>),
        exact: true
    },
    {
        path: '/topics/:topicId',
        component: Topic,
        exact: true
    }
];

const Routes = (props) => {
    const { children, routes } = props;
    console.log('props', props);
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
        exact: false
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
        component: (props ) => {
            console.log('props', props);
            const { match } = props;
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
                    <div>
                        <div>{topicsRoutes.map(route => <Route key={route.key} {...route} />)}</div>
                        {/*<Route path={`${match.url}/:topicId`} component={About} />*/}
                        {/*<Route*/}
                            {/*exact*/}
                            {/*path={match.url}*/}
                            {/*render={() => <h3>Please select a topic.</h3>}*/}
                        {/*/>*/}
                    </div>
                </div>
            );
        },
        key: 'topics',
    },
    {
        path: '/projects',
        component: (props) => {
            console.log('props', props);
            return <ProjectsLoadableComponent />;
        },
        key: 'projects'
    },
    {
        path: '/users',
        component: () => <UsersLoadableComponent />,
        key: 'users'
    }
];

export default routes;
