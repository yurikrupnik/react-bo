import http from 'http';
import IO from 'socket.io';
import Logger from 'socket.io-logger';

export default (app) => {
    const server = http.Server(app.callback());
    const io = IO(server);
    const users = {}; // list of messages locally saved in the server
    io.use(Logger());
    io.on('connection', (socket) => {
        socket.on('newMessage', (message, next) => {
            const { nickname, avatar } = socket;
            // send nickname and avatar with the message taken from socket to all messages
            io.emit('receiveMessage', { message, nickname, avatar });
            next();
        });

        socket.on('newUser', (user, next) => {
            if (Object.keys(users).includes(user.nickname)) {
                next('Name already in use');
            } else {
                // set nickname and avatar on socket object to retrieve later
                socket.nickname = user.nickname; // eslint-disable-line no-param-reassign
                socket.avatar = user.avatar; // eslint-disable-line no-param-reassign
                users[user.nickname] = user;
                next(null);
            }
        });

        socket.on('disconnect', (reason) => { // eslint-disable-line no-unused-vars
            delete users[socket.nickname];
        });
    });

    return server;
};
