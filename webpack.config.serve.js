const convert = require('koa-connect');
const proxy = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');
const { host, port } = require('./src/config');

module.exports = require('./webpack.config.client');

module.exports.serve = {
    content: [__dirname],
    open: true,
    port: port + 1,
    // dev: { index: 'index.ejs' },
    // app, middleware, options
    add: (app) => {
        app.use(convert(proxy('/api', { target: host })));
        app.use(convert(history({ index: '/index.ejs' })));
    }
};
