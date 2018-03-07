function Controller() {
    var view = new View();
    var gamma = 0;
    var oldGamma;
    var socket = io();

    this.init = function () {

        socket.on('setup',function(data,callback){
            view.init(data.width);
            view.popUpWindow(true,"Waiting for the second player");
            callback();
        });
        socket.on('setBoard', function (data) {
            view.canvasPaint(data.balls,data.paddles,data.boxes);
        });
        socket.on('gameStarted',function(){
           view.popUpWindow(false);
        });
        socket.on('victory',function(){
            view.popUpWindow(true,"Congratulations! All boxes destroyed!")
        });
        setInterval(function(){
            socket.emit("gamma",{gamma: gamma})
        },10);
        window.addEventListener("deviceorientation", function (event) {
            gamma = event.gamma;
        });

    socket.emit("clientready", {});
    };
}

var controller = new Controller();
window.addEventListener("load", controller.init);