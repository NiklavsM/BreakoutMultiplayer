function View() {
    var modelWidthToCanvasWidth, MVRatio;
    var canvas , canvasPaddle, widthToHeight = 1 / 2, gameArea,
        waitingScreen,
        drawCircle = function (context, x, y, r, fill) {
            //  console.log(x, y, r);
            context.beginPath();
            context.arc(x * MVRatio, y * MVRatio, r * MVRatio, 0, 360);
            context.fillStyle = fill;
            context.fill();

        },
        drawRect = function (context, x, y, width, height, fill, line) {
            context.beginPath();
            context.rect(x * MVRatio, y * MVRatio, width * MVRatio, height * MVRatio);
            context.fillStyle = fill;
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = line;
            context.stroke();
            //console.log("what");

        };

    this.canvasPaint = function (balls, paddles, boxes) {
        // console.log("here : ", balls, paddles, boxes);
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
    this.popUpWindow = function(on, message){
        if(on) {
            popUpWindow.style.display = "block";
            document.getElementById("popUpWindowContent").innerHTML = message;
        }else{
            popUpWindow.style.display = "none";
        }
    };

    this.init = function (modelWidth) {
         canvas = document.getElementById("canvas");
        popUpWindow = document.getElementById("popUpWindow");
        var newWidth = document.documentElement.clientWidth - 10;
        var newHeight = document.documentElement.clientHeight - 10;
        var newWidthToHeight = newWidth / newHeight;
        if (newWidthToHeight > widthToHeight) {
            newWidth = newHeight * widthToHeight;
        } else {
            newHeight = newWidth / widthToHeight;
        }
        canvas.width = newWidth;
        canvas.height = newHeight;
        canvas.style = "position:absolute; left: 50%; width: " + newWidth + "px; margin-left: -" + newWidth / 2 + "px;";
        canvas.style.border = "solid black 0.1rem";

        MVRatio = parseFloat(canvas.width) / modelWidth;
        console.log(MVRatio, " MVRatio");
    };


}