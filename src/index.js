// import fs from 'fs';
import 'marko/node-require';
import path from 'path';
import Koa from 'koa';
// import Router from 'koa-router';
import statics from 'koa-static';
// import views from 'koa-views';
// import zlib from 'zlib';
// import compress from 'koa-compress';

// if (module.hot) {
//     import('lodash').then(_ => {
//         // Do something with lodash (a.k.a '_')...
//         console.log('_', _);
//     });
// }
import { port, databaseUrl } from './config';
import api from './api';
import db from './db';
// import template from './index.marko';

const template = require('./index.marko');

const app = new Koa();
// app.use(compress({
//     filter: contentType => /text/i.test(contentType),
//     threshold: 2048,
//     flush: zlib.Z_SYNC_FLUSH
// }));

app.use(statics(path.resolve(__dirname, 'assets')));
// app.use(views(path.resolve(__dirname, 'assets'), { extension: 'html' }));
app.use(db(databaseUrl));
app.use(api);

function state() {
    return async function (ctx, next) {
        ctx.state = {
            name: 'Frank',
            count: 30,
            colors: ['red', 'green', 'blue']
        };
        await next();
    };
}

app.use(state());
app.use((ctx) => {
    ctx.type = 'html';
    ctx.body = template.stream(ctx.state);

    // ctx.vary('Accept-Encoding');
    // if (ctx.acceptsEncodings('gzip')) {
    //     ctx.set('Content-Encoding', 'gzip');
    //     ctx.body = ctx.body.pipe(createGzip());
    // }
});
// function render() {
//     const route = new Router();
//     route.get('/*', (ctx) => {
//         ctx.state = { user: 'yu', data: { np: true }, as: true };
//         // console.log('ctx.state', ctx.state);
//         return ctx.render('index');
//     });
//     return route.routes();
// }
//
// app.use(render());
// app.use((ctx) => {
//     ctx.render('index');
// });

app.listen(port, (err) => {
    if (err) {
        console.log('err', err);
    } else {
        console.log(`running at port: ${port}`);
    }
});
