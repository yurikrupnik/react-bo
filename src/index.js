// import fs from 'fs';
import path from 'path';
import Koa from 'koa';
// import Router from 'koa-router';
import statics from 'koa-static';
import views from 'koa-views';
// import zlib from 'zlib';
// import compress from 'koa-compress';
import { port, databaseUrl } from './config';
import api from './api';
import db from './db';

const app = new Koa();
// app.use(compress({
//     filter: contentType => /text/i.test(contentType),
//     threshold: 2048,
//     flush: zlib.Z_SYNC_FLUSH
// }));
// app.use(statics(path.resolve(__dirname)));
// console.log('pth', path.resolve(__dirname, 'assets'));
// console.log('__dirname', __dirname);

// app.set('view engine', 'ejs');
// app.engine('.ejs', ejs);  // <-- this one
console.log('__dirname', __dirname);

app.use(statics(path.resolve(__dirname)));
app.use(statics(path.resolve(__dirname, 'assets')));

app.use(views(`${__dirname}/assets`, { extension: 'ejs' }));
// app.use(views(path.resolve(__dirname, 'assets'), { extension: 'ejs' }));

app.use(db(databaseUrl));
app.use(api);

app.use(ctx => ctx.render('index'));

app.listen(port, (err) => {
    if (err) {
        console.log('err', err);
    } else {
        console.log(`running at port: ${port}`);
    }
});
