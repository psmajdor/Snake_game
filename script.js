const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.getElementById("scoreText");
const resetButton = document.getElementById("resetButton");
const startButton = document.getElementById("startButton");
const upButton = document.getElementById("upButton");
const downButton = document.getElementById("downButton");
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");
const gameWidth = gameBoard.clientWidth;
const gameHeight = gameBoard.clientHeight;
ctx.canvas.width = gameWidth
ctx.canvas.height = gameHeight
const boardBackgroundColor = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const appleColor = "red";
const unitSizePercent = 5;
const unitSize = (unitSizePercent / 100) * gameWidth;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let appleX;
let appleY;
let score = 0;
let snakeStartx = randomCord(0, gameWidth - 10 * unitSize);
let snakeStarty = randomCord(0, gameHeight - 10 * unitSize);
let snake = [
    {x: snakeStartx + unitSize * 3, y: snakeStarty},
    {x: snakeStartx + unitSize * 2, y: snakeStarty},
    {x: snakeStartx + unitSize, y: snakeStarty},
    {x: snakeStartx, y: snakeStarty},
]

window.addEventListener("keydown", changeDirection);
upButton.addEventListener("click", changeDirection);
downButton.addEventListener("click", changeDirection);
leftButton.addEventListener("click", changeDirection);
rightButton.addEventListener("click", changeDirection);
resetButton.addEventListener("click", resetGame);

function gameStart() {
    running = true;
    scoreText.textContent = score;
    createApple();
    drawApple();
    nextTick();
}

function nextTick(){
    if(running){
        setTimeout(() => {
            clearBoard();
            drawApple();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 100) // game pace speed in ms
    }
    else {
        displayGameOver();
    }
}

function clearBoard(){
    ctx.fillStyle = boardBackgroundColor;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function randomCord(min, max) {
    const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randNum
}

function createApple(){
    appleX = randomCord(0, gameWidth - unitSize);
    appleY = randomCord(0, gameHeight - unitSize);
}

function drawApple() {
    ctx.fillStyle = appleColor;
    ctx.fillRect(appleX, appleY, unitSize, unitSize);
}

function moveSnake() {
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};
    snake.unshift(head);
    // when apple is eaten
    if(snake[0].x == appleX && snake[0].y == appleY){
        score += 1;
        scoreText.textContent = score;
        createApple();
    }
    else{
        snake.pop();
    }
}

function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
}

function changeDirection(event) {
    let keyPressed = 0;
    let buttonId = "";
    const LEFT = 37;
    const UP = 38
    const RIGHT = 39;
    const DOWN = 40;
    if(event.keyCode){
        keyPressed = Number(event.keyCode);
    }
    else{
        buttonId = event.target.id
    }
    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    if(true){
        switch(true){
            case((keyPressed == LEFT || buttonId == "leftButton") && !goingRight):
                xVelocity = -unitSize;
                yVelocity = 0;
                break;
            case((keyPressed == RIGHT || buttonId == "rightButton") && !goingLeft):
                xVelocity = unitSize;
                yVelocity = 0;
                break;
            case((keyPressed == UP || buttonId == "upButton") && !goingDown):
                xVelocity = 0;
                yVelocity = -unitSize;
                break;
            case((keyPressed == DOWN || buttonId == "downButton") && !goingUp):
                xVelocity = 0;
                yVelocity = unitSize;
                break;
        }
    }
}

function checkGameOver() {
    switch(true){
        case(snake[0].x < 0):
            running = false;
            break;
        case(snake[0].x >= gameWidth):
            running = false;
            break;
        case(snake[0].y < 0):
            running = false;
            break;
        case(snake[0].y >= gameHeight):
            running = false;
            break;
    }
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            running = false;
        }
    }
}

function displayGameOver() {
    ctx.font = "60px Roboto";
    if(gameWidth < 500){
        ctx.font = "30px Roboto"
    }
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!!!", gameWidth / 2, gameHeight / 2);
    running = false;
}

function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snakeStartx = randomCord(0, gameWidth - 10 * unitSize);
    snakeStarty = randomCord(0, gameHeight - 10 * unitSize);
    snake = [
        {x:snakeStartx + unitSize * 3, y:snakeStarty},
        {x:snakeStartx + unitSize * 2, y:snakeStarty},
        {x:snakeStartx + unitSize, y:snakeStarty},
        {x:snakeStartx, y:snakeStarty},
    ];
    gameStart();
}
