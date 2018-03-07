function Controller() {
    var view = new View();
    var gamma = 0;
    var oldGamma;
    var socket = io();

    this.init = function () {

        socket.on('setup',function(data,callback){
            console.log("hereeee");
            view.init(data.width);
            view.waitingScreen(true);
            console.log(callback , "data");
            callback();
        });
        socket.on('setBoard', function (data) {
            view.canvasPaint(data.balls,data.paddles,data.boxes);
        });
        socket.on('gameStarted',function(){
           view.waitingScreen(false);
        });
        setInterval(function(){
            socket.emit("gamma",{gamma: gamma})
        },10);
        window.addEventListener("deviceorientation", function (event) {
            // document.getElementById("alpha").innerHTML = "<p>alpha: " + event.alpha + "</p>";
            // document.getElementById("beta").innerHTML = "<p>beta: " + event.beta + "</p>";
            // document.getElementById("gamma").innerHTML = "<p>gamma: " + gamma + "</p>";
            gamma = event.gamma;
        });

    socket.emit("clientready", {});
    };
}

var controller = new Controller();
window.addEventListener("load", controller.init);