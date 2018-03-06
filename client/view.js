function View() {
    var ratio = window.devicePixelRatio || 1;
    var canvas, canvasPaddle,
        drawCircle = function (context, x, y, r, fill) {
            context.beginPath();
            context.arc(x, y, r, 0, 360);
            context.fillStyle = fill;
            context.fill();
        },
        drawRect = function (context, x, y, width, height, fill, line) {
            context.beginPath();
            context.rect(x, y, width, height);
            context.fillStyle = fill;
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = line;
            context.stroke();

        },
        movePaddle = function (event) {
            document.getElementById("alpha").innerHTML = "<p>alpha: " + event.alpha + "</p>";
            document.getElementById("beta").innerHTML = "<p>beta: " + event.beta + "</p>";
            document.getElementById("gamma").innerHTML = "<p>gamma: " + event.gamma + "</p>";
        };
    this.canvasPaint = function (balls, paddles, boxes) {
      //  console.log("here : ", balls, paddles, boxes);
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        balls.forEach(function (ball) {
            drawCircle(context, ball.x, ball.y, ball.radius, ball.fillColor);
        });
        paddles.forEach(function (rect) {
            drawRect(context, rect.x, rect.y, rect.width, rect.height, rect.fillColor, rect.lineColor);
        });
        boxes.forEach(function (rect) {
            // console.log(rect);
            drawRect(context, rect.x, rect.y, rect.width, rect.height, rect.fillColor, rect.lineColor);
        });


    };
    this.getCanvasWidth = function () {
        console.log("width ", canvas.width);
        return canvas.width;
    };
    this.getCanvasHeight = function () {
        return canvas.height;
    };
    this.init = function () {
        canvas = document.getElementById("canvas");
        canvas.width = document.documentElement.clientWidth - (document.documentElement.clientWidth * 0.02);
        canvas.height = document.documentElement.clientHeight - (document.documentElement.clientHeight * 0.1);
        //   canvas.setAttribute('height' , (screen.availHeight-100).toString());
    };


}