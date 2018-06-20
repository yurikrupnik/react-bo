import Router from 'koa-router';
import { url } from './config';
import Model from './model';
import { list, find, removeOne, create, response, responseError } from '../methods';

const router = new Router();

router.get(url, (ctx) => {
    ctx.body = [
        {
            _id: '5ad3c7f60e3028920225ab3f',
            name: 'else',
            hashPassword: 'ta s',
            email: '',
        }, {
            id: '5aeb2d96f0fb7e0458ad5cc2',
            name: 'ta',
            hashPassword: 'sd',
            email: 'de@d.com',
        }, {
            id: '5aeb2e168eee9b045d4f049a',
            name: 'yosso',
            email: 'yuri@yuri.com',
            hashPassword: '123d',
        }, {
            id: '5aeb44c423c91d05fc13bc7d',
            email: 'sddsa@2.com',
            hashPassword: '123dasdasd',
        }, {
            id: '5aeb44ce23c91d05fc13bc7e',
            name: 'mikey',
            email: 'sddsa@2.com',
            hashPassword: '123dasdasd',
        }
    ];
}); // array
router.get(`${url}/:id`, find(Model)); // object
router.post(url, create(Model));

router.put(url, ctx => Model.findOneAndUpdate({ _id: ctx.request.body._id }, {
        name: 'else',
        email: '',
        hashPassword: 'ta s'
    }) // eslint-disable-line no-underscore-dangle
    .then(response(ctx))
    .catch(responseError(ctx)));

router.delete(`${url}/:id`, removeOne(Model)); // id

export default router.routes();
