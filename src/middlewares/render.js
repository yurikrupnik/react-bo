import Router from 'koa-router';
import fs from 'fs';
import path from 'path';

function render() {
    const route = new Router();
    route.get('/*', (ctx) => {
        ctx.type = 'html';
        ctx.body = fs.createReadStream(path.resolve(__dirname, '..', 'assets', 'index.html'));
    });
    return route.routes();
}

export default render;
