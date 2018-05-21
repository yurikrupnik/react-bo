import 'marko/node-require';
import path from 'path';
import Koa from 'koa';
import statics from 'koa-static';
import views from 'koa-render-view';
import { port, databaseUrl } from './config';
import api from './api';
import db from './db';

const app = new Koa();

app.use(statics(path.resolve(__dirname, 'assets')));
app.use(views(path.resolve(__dirname, 'assets'), { extension: 'ejs' }));
app.use(db(databaseUrl));
app.use(api);
app.use(async (ctx) => {
    ctx.state = { data: { name: 'asd' } };
    ctx.type = 'html';
    await ctx.render('index', ctx.state);
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
