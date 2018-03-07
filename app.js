var express = require('express');
var app = express();
var serv = require('http').Server(app);
var modelE = require('./client/model.js');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

serv.listen(8080);
console.log("Server started");

var socketList;
var playerId;
var model;
var io = require('socket.io')(serv, {});

var reset = function () {
    model = new modelE();
    playerId = 0;
    socketList = [];
};
reset();
io.sockets.on('connection', function (socket) {
    console.log('socket connection', playerId);
    socket.on("clientready", function (data) {
        console.log("ready");

        if (playerId === 0) {

            socket.id = playerId;
            socketList[playerId] = socket;
            model.init();
            model.addPlayer(playerId);
            playerId++;

        } else if (playerId === 1) {
            socket.id = playerId;
            socketList[playerId] = socket;
            model.addPlayer(playerId);
            playerId++;

        } else {
            console.log("Server is full");
            return;
        }
        socket.emit('setup', {width: model.getWidth()});
        socket.on('gamma', function (data) {
            // console.log(socket.id, " socket.id");
            if (model.getPlayer(socket.id)) {
                model.getPlayer(socket.id).gamma = data.gamma;
            }
        });
        socket.on("disconnect", function () {
            console.log("disconnected ", socket.id);
            reset();
        });
    });
});

setInterval(function () {
    if (socketList.length === 2) {
        model.updateGizmos();
        for (var i in socketList) {
            var socket = socketList[i];
            socket.emit('setBoard', {balls: model.getBalls(), paddles: model.getPaddles(), boxes: model.getBoxes()});
        }
    }

}, 2);