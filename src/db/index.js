import mongoose from 'mongoose';

const setDb = db => (ctx) => {
    ctx.db = db;
};

const initDB = (url) => {
    mongoose.connect(url);
    const db = mongoose.connection;
    mongoose.Promise = global.Promise;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        // we're connected!
    });
    return db;
};

export default initDB;

export { setDb };
