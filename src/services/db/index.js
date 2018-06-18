import mongoose from 'mongoose';

export default (url) => {
    mongoose.connect(url);
    const db = mongoose.connection;
    mongoose.Promise = global.Promise;
    db.on('error', console.error.bind(console, 'connection error:')); // eslint-disable-line no-console
    db.on('connected', () => {
        // console.log('connected:');
    });
    db.on('open', () => {
        // we're connected!
        // console.log('connected to a');
    });
    db.once('open', () => {
        // we're connected!
        // console.log('connected to b');
    });
    db.once('disconnected', () => {
        // we're connected!
        // console.log('disconnected');
    });
    return (ctx, next) => {
        ctx.db = db;
        return next();
    };
};
