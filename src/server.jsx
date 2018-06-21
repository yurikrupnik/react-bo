import path from 'path';
import Koa from 'koa';
import statics from 'koa-static';
import views from 'koa-render-view';
import favicon from 'koa-favicon';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { port, databaseUrl } from './config';
import api from './api';
import db from './services/db';
import server from './services/socket/server';
import App from './components/App';
import routes from './components/routes';

const app = new Koa();
const assets = path.resolve(__dirname, 'assets');

app.use(statics(assets));
app.use(views(assets, { extension: 'ejs' }));
app.use(favicon(path.resolve(assets, 'favicon.ico')));
app.use(db(databaseUrl));
app.use(api);

app.use((ctx) => {
    const context = {};
    const title = 'my title';
    const html = renderToString((<App routes={routes} />));
    ctx.state = { title, html };
    return context.url ? ctx.redirect(301, context.url) : ctx.render('index');
});

server(app).listen(port, (err) => {
    if (err) {
        console.log('err', err); // eslint-disable-line no-console
    } else {
        console.log(`running at port: ${port}`); // eslint-disable-line no-console
    }
});
