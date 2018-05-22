// const root = path.join(__dirname + '/..');
// const env = process.env.NODE_ENV || 'development';
console.log('process.env src config', process.env.NODE_ENV);

const port = process.env.PORT || 5000;
const ip = process.env.IP || '0.0.0.0' || 'localhost';
const host = process.env.WEBSITE_HOSTNAME || `http://${ip}:${port}`;
const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost/react-bo';
// const apiPrefix = '/api';

module.exports = {
    port,
    host,
    databaseUrl
};
