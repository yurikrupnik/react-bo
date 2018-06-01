import Router from 'koa-router';
import { url } from './config';
import data from './data';

const router = new Router();

router.get(url, (ctx) => {
    ctx.body = data;
});


export default router.routes();
