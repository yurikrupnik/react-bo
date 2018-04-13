// let fs = require('fs');
import fs from 'fs';
import { port } from './config';
// import path from 'path';
// import Koa from 'koa';
let path = require('path');
let Koa = require('koa');
let Router = require('koa-router');
let statics = require('koa-static');

function render() {
    let route = new Router();
    route.get('/*', (ctx, next) => {

        ctx.type = 'html';
        // console.log('path', path.resolve(__dirname, 'assets/index.html'));
        // console.log('__dirname', --host);
        // console.log('cwd', process.cwd());

        // const pat = path.relative(__dirname, 'assets/index.html')
        // console.log('pat', pat);

        ctx.body = fs.createReadStream(path.resolve(__dirname, 'assets', 'index.html'));
        // ctx.body = 'fas';
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