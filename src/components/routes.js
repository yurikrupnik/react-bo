// import Loadable from './Loadable';
import Topics from './Topics';
// import usersApi from '../api/users/api';
// import projectsApi from '../api/projects/api';
import Dashboard from './Dashboard';
import Register from './Register';
import Projects from './Projects';
import Users from './Users';
import About from './About';

// const DashboardLoadableComponent = Loadable({
//     loader: () => import(/* webpackChunkName: "dashboard" */ './Dashboard'),
// });
//
// const RegisterLoadableComponent = Loadable({
//     loader: () => import(/* webpackChunkName: "register" */ './Register'),
// });
//
// const ProjectsLoadableComponent = Loadable({
//     loader: () => import(/* webpackChunkName: "projects" */ './Projects'),
// });
// const UsersLoadableComponent = Loadable({
//     loader: () => import(/* webpackChunkName: "users" */ './Users'),
// });
//
// const AboutLoadableComponent = Loadable({
//     loader: () => import(/* webpackChunkName: "about" */ './About'),
// });

const routes = [
    {
        path: '/',
        component: Dashboard,
        exact: true,
        key: 'dashboard',
        // fetch: () => Promise.all([projectsApi.fetch(), usersApi.fetch()]),
        // providers: ['Projects', 'Users']
    },
    {
        path: '/register',
        component: Register,
        key: 'register'
    },
    {
        path: '/about',
        component: About,
        key: 'about'
    },
    {
        path: '/topics',
        component: Topics,
        key: 'topics'
    },
    {
        path: '/projects',
        component: Projects,
        key: 'projects',
        // fetch: () => projectsApi.fetch(),
        // providers: ['Projects']
    },
    {
        path: '/users',
        component: Users,
        key: 'users',
        // fetch: () => usersApi.fetch(),
        // providers: ['Users']
    }
];

export default routes;
