import Loadable from './Loadable';
import Topics from './Topics/index';
import usersApi from '../api/users/api';
import projectsApi from '../api/projects/api';

const DashboardLoadableComponent = Loadable({
    loader: () => import(/* webpackChunkName: "dashboard" */ './Dashboard'),
});

const RegisterLoadableComponent = Loadable({
    loader: () => import(/* webpackChunkName: "register" */ './Register'),
});

const ProjectsLoadableComponent = Loadable({
    loader: () => import(/* webpackChunkName: "projects" */ './Projects'),
});
const UsersLoadableComponent = Loadable({
    loader: () => import(/* webpackChunkName: "users" */ './Users'),
});

const AboutLoadableComponent = Loadable({
    loader: () => import(/* webpackChunkName: "about" */ './About'),
});

const routes = [
    {
        path: '/',
        component: DashboardLoadableComponent,
        exact: true,
        key: 'dashboard',
        fetch: () => Promise.all([projectsApi.fetch(), usersApi.fetch()]),
        // need inject to providers...
        providers: ['Projects', 'Users']
    },
    {
        path: '/register',
        component: RegisterLoadableComponent,
        key: 'register',
        // fetch: () => projectsApi.fetch(),
        // providers: ['Projects']
    },
    {
        path: '/about',
        component: AboutLoadableComponent,
        key: 'about',
        // fetch: () => usersApi.fetch(),
        // providers: ['Users']
    },
    {
        path: '/topics',
        component: Topics,
        key: 'topics',
        // fetch: () => usersApi.fetch(),
        // providers: ['Users']
    },
    {
        path: '/projects',
        component: ProjectsLoadableComponent,
        key: 'projects',
        fetch: () => projectsApi.fetch(),
        // need inject to providers...
        providers: ['Projects']
    },
    {
        path: '/users',
        component: UsersLoadableComponent,
        key: 'users',
        fetch: () => usersApi.fetch(),
        providers: ['Users']
    }
];

export default routes;
