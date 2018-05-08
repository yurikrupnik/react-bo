const response = ctx => (res) => {
    ctx.body = res;
};

const responseId = ctx => (res) => {
    ctx.body = res._id;
};

const responseError = ctx => (err) => {
    ctx.status = 500;
    ctx.body = err;
};


const list = Model => ctx => Model.find({})
    .then(response(ctx))
    .catch(responseError(ctx));

const find = Model => ctx => Model.findOne({ _id: ctx.params.id })
    .then(response(ctx))
    .catch(responseError(ctx));

const removeOne = Model => ctx => Model.findOneAndRemove({ _id: ctx.params.id })
    .then(responseId(ctx))
    .catch(responseError(ctx));

const create = Model => (ctx) => {
    const user = new Model(ctx.request.body);
    return user.save()
        .then(response(ctx))
        .catch(responseError(ctx));
};

export { list, find, removeOne, create, response, responseError };
