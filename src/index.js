import fs from 'fs';
import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import statics from 'koa-static';
import logger from 'koa-logger';
import { port } from './config';

function render() {
    const route = new Router();
    route.get('/*', (ctx) => {
        ctx.type = 'html';
        ctx.body = fs.createReadStream(path.resolve(__dirname, 'assets', 'index.html'));
    });
    return route.routes();
}

function sluts() {
    const route = new Router();
    route.get('/sluts', async (ctx) => {
        ctx.type = 'json';
        ctx.body = ['1', 4, 6];
    });
    return route.routes();
}

function api() {
    const route = new Router();
    route.use('/api', sluts());
    return route.routes();
}


const app = new Koa();
app.use(logger());
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(statics(path.resolve(__dirname, 'assets')));
app.use(api());
app.use(render());
app.listen(port);
