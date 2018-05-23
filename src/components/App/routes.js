import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import { Route, Link, Redirect } from 'react-router-dom';
// import Topics from './Topics';


const About = () => (
    <div>
        <h2>About</h2>
    </div>
);


class MainNav extends Component {
    constructor(props) {
        super(props);
        this.state = { session: 's' };
    }

    render() {
        if (!this.state.session) {
            return (<Redirect to="/register" />);
        }
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
        path: '/topics',
        component: () => (<h3>Please select a topic.</h3>),
        exact: true,
        key: '/topics/topics'
    },
    {
        path: '/topics/:topicId',
        component: Topic,
        exact: true,
        key: '/topics/:topics'
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
Routes.defaultProps = {
    children: null
};

Routes.propTypes = {
    children: PropTypes.element,
    routes: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string.isRequired
    })).isRequired
};

const Topics = (props) => {
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
    console.log('match.url', match.url);

    if (true) {
        // return <Redirect from={match.url} to={`${match.url}/components`} />;
    }
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
};

const routes = [
    {
        path: '/',
        component: MainNav,
        key: 'nav'
    },
    {
        path: '/register',
        component: () => (<div>register</div>),
        key: '/register',
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
    }
];

export default routes;
