// import fs from 'fs';
// import 'marko/node-require';
// import React from 'react';
import path from 'path';
import Koa from 'koa';
// import Loadable from 'react-loadable';
// import Router from 'koa-router';
import statics from 'koa-static';
// import views from 'koa-views';
import views from 'koa-render-view';
// import marko from 'marko';
// import zlib from 'zlib';
// import compress from 'koa-compress';
// import ReactDOMServer from 'react-dom/server';
// import { renderToString } from 'react-dom/server';
// import template from './assets/index.marko';
// import { port } from './config';
import { renderToString } from 'react-dom/server';
import { port, databaseUrl } from './config';
import api from './api';
import db from './db';

const app = new Koa();
app.use(statics(path.resolve(__dirname, 'assets')));
app.use(db(databaseUrl));
// app.use((ctx, next) => {
//     // console.log('ctx.db', ctx.db);
//     return next();
// });
app.use(api);
app.use(views(path.resolve(__dirname, 'assets')));
// app.use(views('/assets', { extension: 'ejs' }));
// app.use(ctx => ctx.render('index', { state: { user: 'aris' } }));
// app.use((ctx) => {
//     ctx.type = 'html';
//     ctx.body = marko.load('./assets/index.marko').stream({
//         name: 'Frank',
//         count: 30,
//         colors: ['red', 'green', 'blue']
//     });
// });
// function render() {
//     const route = new Router();
//     route.get('/*', (ctx, next) => {
//         ctx.body = 'shit body';
//         return next();
//     });
//     return route.allowedMethods();
// }
app.use(async (ctx, next) => {
    console.log('ctx.error', ctx.error);
    await next();
});
// app.use(render());
app.use(async (ctx) => {
    ctx.state = { data: { name: 'asd', html: renderToString('<div>app html from server</div>') } };
    ctx.type = 'html';
    await ctx.render('index.ejs', ctx.state);
// ctx.body = 'helo';
});
// Loadable.preloadAll().then(() => {
app.listen(port, (err) => {
    if (err) {
        console.log('err', err);
    } else {
        console.log(`running at port: ${port}`);
    }
});
// });
