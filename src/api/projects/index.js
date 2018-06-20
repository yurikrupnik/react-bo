import Router from 'koa-router';
import { url } from './config';
import Model from './model';
import { list, find, removeOne, create, response, responseError } from '../methods';

const router = new Router();

router.get(url, (ctx) => {
    ctx.body = [
        {
            date: '2018-06-16T20:51:09.232Z',
            _id: '5b25783da4fa073279237e5f',
            name: 'project1',
        },
        {
            date: '2018-04-16T20:51:09.232Z',
            _id: '5b25713da4fa073279237e5f',
            name: 'project2',
        }
    ];
}); // array
router.get(`${url}/:id`, find(Model)); // object
router.post(url, create(Model));

router.put(url, ctx => Model.findOneAndUpdate({ _id: ctx.request.body._id }, {
        name: 'else',
        email: '',
        hashPassword: 'tas'
    })
    .then(response(ctx))
    .catch(responseError(ctx)));

router.delete(`${url}/:id`, removeOne(Model)); // id

export default router.routes();
