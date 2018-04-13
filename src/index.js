import fs from 'fs';
import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import statics from 'koa-static';
import { port } from './config';

function render() {
    let route = new Router();
    route.get('/*', (ctx, next) => {
        ctx.type = 'html';
        ctx.body = fs.createReadStream(path.resolve(__dirname, 'assets', 'index.html'));
    });
    return route.routes();
}

function sluts() {
    let route = new Router();
    route.get('/sluts', async (ctx, next) => {

        ctx.type = 'json';
        ctx.body = ['1', 4, 6]
    });
    return route.routes();
}

function api() {
    let route = new Router();
    route.use('/api', sluts());
    return route.routes();
}


let app = new Koa();
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(statics(path.resolve(__dirname, 'assets')));
app.use(api());
app.use(render());
app.listen(port, (err) => {
    if (err) {
        console.log('err', err);
    } else {
        console.log('lisenning');

    }
});