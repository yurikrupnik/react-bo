// import fs from 'fs';
// import 'marko/node-require';
// import React from 'react';
import path from 'path';
import Koa from 'koa';
import Loadable from 'react-loadable';
// import Router from 'koa-router';
import statics from 'koa-static';
// import views from 'koa-views';
import zlib from 'zlib';
import compress from 'koa-compress';
// import ReactDOMServer from 'react-dom/server';
// import { renderToString } from 'react-dom/server';
import { port, databaseUrl } from './config';
import api from './api';
import db from './db';
import App from './components/App';
import state from './middlewares/state';
import html from './middlewares/html';

const app = new Koa();
app.use(compress({
    filter: contentType => /text/i.test(contentType),
    threshold: 2048,
    flush: zlib.Z_SYNC_FLUSH
}));
app.use(statics(path.resolve(__dirname, 'assets')));
app.use(db(databaseUrl));
app.use(api);
app.use(state());
app.use(html(App));

Loadable.preloadAll().then(() => {
    app.listen(port, (err) => {
        if (err) {
            console.log('err', err);
        } else {
            console.log(`running at port: ${port}`);
        }
    });
});
