// import fs from 'fs';
import 'marko/node-require';
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
import { port, databaseUrl } from './config';
import api from './api';
import db from './db';

const app = new Koa();
// app.use(compress({
//     filter: contentType => /text/i.test(contentType),
//     threshold: 2048,
//     flush: zlib.Z_SYNC_FLUSH
// }));

app.use(statics(path.resolve(__dirname, 'assets')));
app.use(db(databaseUrl));
app.use(api);
// console.log('path.join(__dirname, \'/assets\')', path.join(__dirname, 'assets'));
app.use(views(path.join(__dirname, 'assets')), {
    recursive: true,
    extension: 'ejs',
    map: {
        html: 'ejs',
        ejs: 'ejs'
    }
});
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
//     route.get('/*', ctx => ctx.render('index', { age: 10, name: 'as' }));
//     return route.allowedMethods();
// }

// app.use(render());
app.use((ctx) => {
    // ctx.body = 'lol';
    ctx.type = 'html';
    return ctx.render('index.ejs');
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
