const http = require('http') ;
const express = require('express') ;
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const { setUser, getUser } = require('./userBase.js');

const io = new Server(server);

const curUserInfo = {};

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/script.js', (req,res) => {
    res.sendFile(__dirname + '/script.js'); 
});


io.on('connection', socket => {
    
    console.log('a user connected');

    socket.on('user addition', (username) => {
        insertUserIntoDatabase(username,socket);
    });

    socket.on('search user', (user) => {
        searchUser(user, socket);
    });

    socket.on('chat message', (userChat) => {
        sendChat(userChat, socket);
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });

});

function sendChat(userChat, socket) {
    const user = getUser(userChat.username);
    user.connection.emit('chat message', { message: userChat.message, from: curUserInfo[socket.id].name});
}

function searchUser(user, socket) {
    const userData = getUser(user);
    if(userData)
        socket.emit('search user', userData.name);
    else
        socket.emit('search user', null);
}

function insertUserIntoDatabase(username, socket) {
    const user = setUser(username, socket);
    socket.emit('registered', user.name);    // note here user can not be passed since parsing can not be done
    curUserInfo[socket.id] = {
        name: username,
    };
}


server.listen(3000, () => {
    console.log('server is running at port 3000');
});
