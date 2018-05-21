// const Koa = require('koa');
// const statics = require('koa-static');
// const views = require('koa-views');
// const path = require('path');
// const Router = require('koa-router');
require('marko/node-require');
// const { createGzip } = require('zlib');
const path = require('path');
const Koa = require('koa');
const statics = require('koa-static');
const bodyparser = require('koa-bodyparser');
const views = require('koa-views');
const render = require('koa-ejs');
const marko = require('marko');
console.log('marko', marko);

const app = new Koa();

// const template = require('./assets/index.marko');
// render(app, {
//     root: path.join(__dirname, 'src', 'text.index.ejs'),
//     // layout: 'template',
//     viewExt: 'ejs',
//     cache: false,
//     debug: true
// });


// app.use(bodyparser());
// app.use(statics(path.resolve(__dirname)));
// app.use(views(path.resolve(__dirname)), { extension: 'ejs' });

function state() {
    return async function (ctx, next) {
        ctx.state = {
            name: 'Yuri',
            count: 30,
            colors: ['red', 'green', 'blue']
        };
        await next();
    };
}

app.use(state());

app.use(async (ctx) => {
    ctx.type = 'html';
    ctx.body = marko.load('./src/assets/index.marko').stream(ctx.state);
    // await ctx.render('text.index.ejs');
});
// app.use((ctx) => {
//     ctx.type = 'html';
//     ctx.body = template.stream(ctx.state);
//
//     ctx.vary('Accept-Encoding');
//     if (ctx.acceptsEncodings('gzip')) {
//         ctx.set('Content-Encoding', 'gzip');
//         ctx.body = ctx.body.pipe(createGzip());
//     }
// });
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
