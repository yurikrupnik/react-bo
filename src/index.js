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

function nums() {
    const route = new Router();
    route.get('/nums', async (ctx) => {
        // ctx.type = 'json';
        ctx.body = ['1', 4, 6, 2343, 5454];
    });
    return route.routes();
}

function api() {
    const route = new Router();
    route.use('/api', nums());
    return route.routes();
}

const app = new Koa();
app.use(statics(path.resolve(__dirname, 'assets')));
app.use(logger());
app.use(api());
app.use(render());
app.listen(port, (err) => {
    if (err) {
        console.log('err', err);
    } else {
        console.log(`running at port: ${port}`);
    }
});
