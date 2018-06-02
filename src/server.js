import path from 'path';
import Koa from 'koa';
import statics from 'koa-static';
import views from 'koa-render-view';
import { port } from './config';
import api from './api';

const app = new Koa();

app.use(statics(path.resolve(__dirname, 'assets')));
app.use(views(path.resolve(__dirname, 'assets'), { extension: 'ejs' })); // for debug remove assets and run - todo to fix
app.use(api);
app.use(async (ctx) => {
    ctx.state = { data: { name: 'asd' } };
    ctx.type = 'html';
    await ctx.render('index', ctx.state);
});

app.listen(port, (err) => {
    if (err) {
        console.log('err', err); // eslint-disable-line no-console
    } else {
        console.log(`running at port: ${port}`); // eslint-disable-line no-console
    }
});
