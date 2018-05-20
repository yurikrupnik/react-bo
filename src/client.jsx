import React from 'react';
import { render } from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
// import App from './component/App';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// import Loading from './Loading';
import Provider from './store/container';
import './styles.scss';
import routes from './routes';

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
                exact
                path={match.url}
                render={() => <h3>Please select a topic.</h3>}
            />
        </div>
    );
};
// const routes = [
//     {
//         path: '/',
//         component: () => <LoadableComponent />,
//         exact: true,
//         key: 'main'
//     },
//     {
//         path: '/about',
//         component: About,
//         exact: true,
//         key: 'about'
//     },
//     {
//         path: '/topics',
//         // component: Topics,
//         // exact: true,
//         key: 'topics',
//         routes: [
//             {
//                 path: '/:topicId',
//                 component: Topic
//             }
//         ]
//     },
//     {
//         path: '/projects',
//         component: (props) => {
//             console.log('props', props);
//             return <ProjectsLoadableComponent />;
//         },
//         exact: true,
//         key: 'projects'
//     },
//     {
//         path: '/users',
//         component: () => <UsersLoadableComponent />,
//         exact: true,
//         key: 'users'
//     },
// ];

const RouteWithSubRoutes = (route) => (
    <Route path={route.path} exact={route.exact} component={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
    )}
    />
);

const BasicExample = () => (
    <Router>
        <div>
            <div>sda</div>
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
                    <Link to="/projects">Projects</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
            </ul>

            <hr />

            <Route path="/topics" component={Topics} />
        </div>
    </Router>
);

render(
    (
        <Provider>
            <BasicExample
                userAgent={global.navigator.userAgent}
                initialState={global.window.preloadedState}
            />
        </Provider>
    ),
    global.document.getElementById('root'),
);
