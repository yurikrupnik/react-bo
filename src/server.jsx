import path from 'path';
import Koa from 'koa';
import statics from 'koa-static';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import views from 'koa-render-view';
import React from 'react';
import { port, databaseUrl } from './config';
import api from './api';
import db from './services/db';
import socket from './services/socket/server';
import App from './components/App';
import routes from './components/App/routes';
import request from 'axios';

const app = new Koa();
const assets = path.resolve(__dirname, 'assets');

app.use(statics(assets));
app.use(views(assets, { extension: 'ejs' }));
app.use(db(databaseUrl));
app.use(api);

app.use( (ctx) => {
    const activeRoute = routes.find(route => matchPath(ctx.url, route));

    const promise = activeRoute.getData ?
        activeRoute.getData() :
        Promise.resolve();
    //
    // const Promises = Promise.all([
    //     promise,
    //     request.get('http://localhost:5000/api/projects')
    // ]);
    promise.then(res => {
        console.log('res', res);
        const context = {};
        const html = renderToString((
            <StaticRouter
                location={ctx.url}
                context={res}
            >
                <App initialState={{}} />
            </StaticRouter>
        ));
        ctx.state = { title: 'my title', html };
        return context.url ? ctx.redirect(301, context.url) : ctx.render('index');
    })
        .catch(err => console.log('err', err));
});


socket(app).listen(port, (err) => {
    if (err) {
        console.log('err', err); // eslint-disable-line no-console
    } else {
        console.log(`running at port: ${port}`); // eslint-disable-line no-console
    }
});

