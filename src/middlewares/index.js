import Router from 'koa-router';
import logger from 'koa-logger';
// import path from 'path';
// import statics from 'koa-static';
import render from './render';

export default () => {
    const route = new Router();
    route.use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.set('X-Response-Time', `${ms}ms`);
    });
    route.use(logger());
    route.get(render());
    route.allowedMethods();
    return route.routes();
};
