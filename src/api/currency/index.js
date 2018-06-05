import Router from 'koa-router';
import request from 'axios';
import { currenciesUrl, convertUrl } from './config';

const router = new Router();
const baseUrl = 'http://data.fixer.io/api/';
const key = 'access_key=a18379edacb33d0e896a9ef3567ba3e8';
const format = 'format=1';

router.get(convertUrl, (ctx) => {
    const { from, to, amount } = ctx.query;
    return request.get(`${baseUrl}convert?${key}&${format}&from=${from}&to=${to}&amount=${amount}`)
        .then((res) => { ctx.body = res.data; })
        .catch(err => console.log('err', err));
});
router.get(currenciesUrl, ctx => request.get('https://free.currencyconverterapi.com/api/v5/currencies')
    .then((res) => { ctx.body = res.data.results; })
    .catch(err => console.log('err', err)));

export default router.routes();
