function Controller() {
    var view = new View();
    var gamma = 0;
    var oldGamma;
    var socket = io();

    this.init = function () {
        view.init();
        socket.emit("host",{width: view.getCanvasWidth(), height: view.getCanvasHeight()});
        socket.on('setBoard', function (data) {
            view.canvasPaint(data.balls,data.paddles,data.boxes);
        });

        setInterval(function(){
            socket.emit("gamma",{gamma: gamma})
        },10);
        window.addEventListener("deviceorientation", function (event) {
            document.getElementById("alpha").innerHTML = "<p>alpha: " + event.alpha + "</p>";
            document.getElementById("beta").innerHTML = "<p>beta: " + event.beta + "</p>";
            document.getElementById("gamma").innerHTML = "<p>gamma: " + gamma + "</p>";
            gamma = event.gamma;
        });


    };
}

var controller = new Controller();
window.addEventListener("load", controller.init);