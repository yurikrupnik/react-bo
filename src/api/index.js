import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import users from './users';
import projects from './projects';
import fu from './fu';
import positions from './positions';
import currency from './currency';

const route = new Router();

route.use(logger());
route.use(bodyParser());
route.use('/api', users, projects, fu, positions, currency);

export default route.routes();
