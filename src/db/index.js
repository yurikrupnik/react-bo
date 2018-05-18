import mongoose from 'mongoose';

export default url => (ctx, next) => {
    if (!ctx.db) {
        mongoose.connect(url);
        const db = mongoose.connection;
        mongoose.Promise = global.Promise;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => {
            // we're connected!
        });
        // return db;
        ctx.db = db;
    }
    return next();
};
