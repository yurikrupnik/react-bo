import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import users from './users';
import projects from './projects';

const route = new Router();

route.use(logger());
route.use(bodyParser());
route.use('/api', users, projects);

export default route.routes();
