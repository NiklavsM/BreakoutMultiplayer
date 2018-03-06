var Model = function () {
    const margin = 10, boxesInRow = 13;

    var boxWidth, paddleWidth, paddleHeight, boardWidth, boardHeight;
    var balls = [],
        players = [],
        boxes = [],
        updatePaddles = function () {
            var newX, f = 0.1;
            for (var key in players) {
                var paddle = players[key].getPaddle();
                var gamma = players[key].gamma;
                newX = paddle.x + (parseFloat(gamma) * f);
                if (newX < 0) {
                    paddle.x = 0;
                }
                else if (newX > boardWidth - paddleWidth) {
                    paddle.x = boardWidth - paddleWidth;
                } else {
                    paddle.x = newX;
                }
            }
        },
        updateBall = function () {

            for (var i in balls) {
                var ball = balls[i], radius = ball.radius,
                    newX = ball.x + ball.xVelo, newY = ball.y + ball.yVelo,
                    xSet = false, ySet = false, popBox = -1;
                for (var key in boxes) {
                    var box = boxes[key];
                    if (box.x < newX + radius && box.x + boxWidth > newX - radius) {
                        if (box.y < newY + radius && box.y + boxWidth > newY - radius) {
                            ball.yVelo = -ball.yVelo;
                            popBox = key;
                            break;
                        }
                    }
                }
                if (popBox !== -1) boxes.splice(popBox, 1);

                if (newX < radius) {
                    ball.x = radius;
                    ball.xVelo = -ball.xVelo;
                    xSet = true;
                } else if (newX > boardWidth - radius) {
                    ball.x = boardWidth - radius;
                    ball.xVelo = -ball.xVelo;
                    xSet = true;
                }
                if (newY < radius) {
                    ball.y = radius;
                    ball.yVelo = -ball.yVelo;
                    ySet = true;
                } else if (newY > boardHeight - radius) {
                    //game lost
                    ball.y = boardHeight - radius;
                    ball.yVelo = -ball.yVelo;
                    ySet = true;
                }
                for (key in players) {
                    var paddle = players[key].getPaddle();
                    if (newX > paddle.x - radius && newX < paddle.x + paddleWidth + radius) {
                        if (newY > paddle.y - radius)
                            if (newY < paddle.y + paddleHeight + radius) {
                            if(paddle.id === 0) {
                                ball.y = paddle.y - radius;
                            }else{
                                ball.y = paddle.y + paddle.height +  radius;
                            }
                                ball.yVelo = -ball.yVelo;
                                ySet = true;
                            }
                    }
                }
                if (!xSet) ball.x = newX;
                if (!ySet) ball.y = newY;

            }
        };
    this.updateGizmos = function () {
        updatePaddles();
        updateBall();
    };
    this.getBalls = function () {
        return balls;
    };
    this.getBoxes = function () {
        return boxes;
    };
    this.getPaddles = function () {
        var paddles = [];
        for (var key in players) {
            paddles.push(players[key].getPaddle());
        }
        return paddles;
    };
    this.init = function (width, height) {
        boardWidth = width;
        boardHeight = height;
        boxWidth = (boardWidth - boxesInRow * margin - margin) / boxesInRow;
        paddleWidth = boardWidth / 6;
        paddleHeight = 50;

        var boxColor = ["red", "blue", "green", "yellow"];

        for (var i = 0; i < 13; i++) {
            for (var k = 0; k < 4; k++) {
                boxes.push({
                    x: i * (boxWidth) + (i + 1) * 10,
                    y: boardHeight / 2 + k * (boxWidth) + k * 10,
                    width: boxWidth,
                    height: boxWidth,
                    fillColor: boxColor[k],
                    lineColor: "black"
                })
            }
        }
        console.log('bingo');

    };
    this.getPlayer = function (id) {
        for (var key in players) {
            if (players[key].id == id) {
                return players[id];
            }
        }
    };
    this.addPlayer = function (id) {
        players.push(new Player(id));
        if (balls.length === 0) {
            balls.push(new Ball(boardWidth * 0.75, boardHeight * 0.75, boxWidth / 5, "green", 2, 2));
        } else {
            balls.push(new Ball(boardWidth * 0.25, boardHeight * 0.25, boxWidth / 5, "green", 2, 2));
        }
    };
    var Player = function (id) {
        var paddle;
        if (id === 0) {
            paddle = new Paddle(id,boardWidth * 0.6, boardHeight - paddleHeight, paddleWidth, paddleHeight, "blue");
        }
        if (id === 1) {
            paddle = new Paddle(id,boardWidth * 0.6, 0, paddleWidth, paddleHeight, "orange");
        }
        this.id = id;
        this.gamma = 0;
        this.getPaddle = function () {
            return paddle;
        }


    };

    var Paddle = function (id, x, y, width, height, color) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fillColor = color;
        this.lineColor = color;

    };

    var Ball = function (x, y, r, color, xVelo, yVelo) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.fillColor = color;
        this.xVelo = xVelo;
        this.yVelo = yVelo;
    }
};
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Model;
} else {
    Window.Model = Model;
}


