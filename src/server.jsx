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
import routes from './components/routes';

const app = new Koa();
const assets = path.resolve(__dirname, 'assets');

app.use(statics(assets));
app.use(views(assets, { extension: 'ejs' }));
app.use(db(databaseUrl));
app.use(api);

app.use((ctx) => {

    const activeRoute = routes.find(route => matchPath(ctx.url === '/favicon.ico' ? '/' : ctx.url, route));

    console.log('ctx.url', ctx.url);
    console.log('activeRoute', activeRoute);

    const promise = activeRoute.fetch ?
        activeRoute.fetch() :
        Promise.resolve();
    //
    // const Promises = Promise.all([
    //     promise,
    //     request.get('http://localhost:5000/api/projects')
    // ]);
    return promise.then(res => {
        const context = {
            // data: res
        };
        console.log('res', res);

        // const html = renderToString(<App />);
        const html = renderToString((
            <StaticRouter
                location={ctx.url}
                context={context}
            >
                <App />
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

