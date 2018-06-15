import path from 'path';
import Koa from 'koa';
import statics from 'koa-static';
import views from 'koa-render-view';
import favicon from 'koa-favicon';
import React from 'react';
import Loadable, { getBundles } from 'react-loadable';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import { port, databaseUrl } from './config';
import api from './api';
import db from './services/db';
import socket from './services/socket/server';
import App from './components/App';
import routes from './components/routes';
// import stats from './react-loadable.json';

const app = new Koa();
const assets = path.resolve(__dirname, 'assets');

app.use(statics(assets));
app.use(views(assets, { extension: 'ejs' }));
app.use(favicon(path.resolve(assets, 'favicon.ico')));
app.use(db(databaseUrl));
app.use(api);

app.use((ctx, next) => {
    const activeRoute = routes.find(route => matchPath(ctx.url, route)) || {};
    const promise = activeRoute.fetch ?
        activeRoute.fetch() :
        Promise.resolve([]);

    return promise
        .then((res) => {
            let appData = {};
            console.log('res', res);

            if (res.length && Array.isArray(activeRoute.providers)) {
                appData = activeRoute.providers.reduce((acc, nextProvider, i) => {
                    acc[nextProvider] = Array.isArray(res[0]) ? res[i] : res;
                    return acc;
                }, appData);
            }
            console.log('appData', appData);

            const context = {};
            const modules = {};
            const title = 'my title';
            const html = renderToString((
                <StaticRouter
                    location={ctx.url}
                    context={context}
                >
                    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
                        <App />
                    </Loadable.Capture>
                </StaticRouter>
            ));
            ctx.state = { title, html, appData };
            return context.url ? ctx.redirect(301, context.url) : ctx.render('index');
        })
        .catch(err => {
            console.log('err', err.stack);
            return next(err);
        });
});

Loadable.preloadAll().then(() => {
    socket(app).listen(port, (err) => {
        if (err) {
            console.log('err', err); // eslint-disable-line no-console
        } else {
            console.log(`running at port: ${port}`); // eslint-disable-line no-console
        }
    });
});
