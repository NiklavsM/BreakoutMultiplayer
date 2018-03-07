function Controller() {
    var model = new Model();
    var view = new View();
    var gamma = 0;
    var oldGamma;

    this.init = function () {
        model.init();
        view.init(model.getWidth());

        model.addPlayer(0);
        setInterval(function () {
            model.getPlayer(0).gamma = gamma;
            model.updateGizmos();
            if(model.getBoxes()===0)view.popUpWindow(true,"Congratulations! All boxes destroyed!");
            view.canvasPaint(model.getBalls(), model.getPaddles(), model.getBoxes());
        }, 5);

        window.addEventListener("deviceorientation", function (event) {
            gamma = event.gamma;
        });
        window.addEventListener('resize', view.resizeGame, false);
        window.addEventListener('orientationchange', view.resizeGame, false);


    };
}

var controller = new Controller();
window.addEventListener("load", controller.init);