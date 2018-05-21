// const Koa = require('koa');
// const statics = require('koa-static');
// const views = require('koa-views');
// const path = require('path');
// const Router = require('koa-router');
require('marko/node-require');
const { createGzip } = require('zlib');
const Koa = require('koa');

const app = new Koa();

const template = require('./assets/index.marko');

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

    ctx.vary('Accept-Encoding');
    if (ctx.acceptsEncodings('gzip')) {
        ctx.set('Content-Encoding', 'gzip');
        ctx.body = ctx.body.pipe(createGzip());
    }
});
// function render() {
//     const route = new Router();
//     route.get('/*', (ctx) => {
//         ctx.state = { user: 'yu', data: { np: true }, as: true };
//         console.log('ctx.state', ctx.state);
//         return ctx.render('index');
//     });
//     return route.routes();
// }
//
// const app = new Koa();
// app.use(statics(path.resolve(__dirname)));
// app.use(views(path.resolve(__dirname), { extension: 'ejs' }));
// app.use(render());

app.listen(2000);
