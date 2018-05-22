import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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

const Header = (props) => {
    console.log('props', props);
    return (<div>header</div>);
};
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

const routes = [
    {
        path: '/',
        component: Header,
        // component: () => {
        // const LoadableComponent = Loadable({
        //     loader: () => import(/* webpackChunkName: "app" */ './components/App'),
        //     loading: Loading
        // });
        // return <LoadableComponent />;
        // // return (<div>helo</div>);
        // },
        // exact: true,
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
    }
];

const BasicExample = props => (
    <Router>
        <div>
            <span>as</span>
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
                <li>
                    <Link to="/users">Users</Link>
                </li>
                <li>
                    <Link to="/projects">Pojects</Link>
                </li>
            </ul>

            <hr />

        </div>
    </Router>
);
BasicExample.propTypes = {
    // routes: PropTypes.shape([]).isRequired
};

export default BasicExample;

export { routes };
