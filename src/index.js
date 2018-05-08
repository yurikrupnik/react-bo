import fs from 'fs';
import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import statics from 'koa-static';
import { port, databaseUrl } from './config';
import api from './api';
import initDB, { setDb } from './db';


function render() {
    const route = new Router();
    route.get('/*', (ctx) => {
        ctx.type = 'html';
        ctx.body = fs.createReadStream(path.resolve(__dirname, 'assets', 'index.html'));
    });
    return route.routes();
}

const app = new Koa();
app.use(statics(path.resolve(__dirname, 'assets')));
app.use(api);
app.use(setDb(initDB(databaseUrl)));
app.use(render());
app.listen(port, (err) => {
    if (err) {
        console.log('err', err);
    } else {
        console.log(`running at port: ${port}`);
    }
});
