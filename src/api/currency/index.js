import Router from 'koa-router';
import { url } from './config';
import request from 'axios';
// import { readPending, readSuccess } from "./actions";
// import https from 'https';

const router = new Router();

// url http://free.currencyconverterapi.com/api/v5/convert?q=ILS_USD

router.get(url, (ctx) => {
    console.log('ctx.query', ctx.query);
    // console.log('ctx.query', ctx.request.query);
    // console.log('ctx.request.body', ctx.request.body);
    // console.log('ctx.request.params', ctx.request.params);

    // dispatch(readPending(params));
    return request.get(`https://free.currencyconverterapi.com/api/v5/convert?q=ILS_USD,PHP_USD&compact=y`).then(res => {
        console.log('res.data', res.data);

        ctx.body = res.data;
    }).catch(err => console.log('err', err));
    // ctx.body = await router.get('http://free.currencyconverterapi.com/api/v5/convert?q=ILS_USD');
    // ctx.body = [];
});


export default router.routes();
