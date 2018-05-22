import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const BasicExample = () => (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/topics">Topics</Link>
                </li>
            </ul>

            <hr />

            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} />
        </div>
    </Router>
);

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

const Topics = ({ match }) => (
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

        <Route path={`${match.url}/:topicId`} component={Topic} />
        <Route
            exact
            path={match.url}
            render={() => <h3>Please select a topic.</h3>}
        />
    </div>
);

const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
);


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

// const LoadableComponent = Loadable({
//     loader: () => import(/* webpackChunkName: "app" */ '../component/App'),
//     loading: Loading,
// });
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
        component: () => {
            const LoadableComponent = Loadable({
                loader: () => import(/* webpackChunkName: "app" */ '../../components/App'),
                loading: Loading
            });
            return <LoadableComponent />;
        },
        exact: true,
        key: 'main'
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
    },
    // {
    //     path: '/*',
    //     exact: false,
    //     component: NoMatch
    // }
];

export default BasicExample;
