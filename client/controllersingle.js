function Controller() {
    var model = new Model();
    var view = new View();
    var gamma = 0;
    var oldGamma;

    this.init = function () {
        view.init();
        model.init(view.getCanvasWidth(), view.getCanvasHeight());
        model.addPlayer(0);
        setInterval(function () {
            model.updateGizmos();
            view.canvasPaint(model.getBalls(), model.getPaddles(), model.getBoxes());
        }, 2);
        setInterval(function () {
            model.getPlayer(0).gamma = gamma;
        }, 10);
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