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

module.exports = state;
