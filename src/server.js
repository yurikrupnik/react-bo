import path from 'path';
import Koa from 'koa';
import statics from 'koa-static';
import views from 'koa-render-view';

import http from 'http';
import sockets from 'socket.io';

import { port, databaseUrl } from './config';
import api from './api';
import db from './db';

const app = new Koa();

app.use(statics(path.resolve(__dirname, 'assets')));
app.use(views(path.resolve(__dirname, 'assets'), { extension: 'ejs' }));
// for debug remove assets and run
app.use(db(databaseUrl));
app.use(api);
app.use(async (ctx) => {
    ctx.state = { data: { name: 'asd' } };
    ctx.type = 'html';
    await ctx.render('index', ctx.state);
});


const server = http.Server(app.callback());
const io = sockets(server);
const users = {}; // list of messages locally saved in the server
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

// Loadable.preloadAll().then(() => {
server.listen(port, (err) => {
    if (err) {
        console.log('err', err);
    } else {
        console.log(`running at port: ${port}`);
    }
});
// });
