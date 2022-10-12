
var canvas = document.getElementById('game-canvas');
var heightRatio = 1.5;
canvas.height = canvas.width * heightRatio;

//var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var playerX = canvas.width / 2;
var playerY = canvas.height - 50;
//var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var playerHeight = 50;
var playerWidth = 10;
//var playerHeight = canvas.height / 10;
//var playerWidth = canvas.width / 40;
var playerY = 180;
var upPressed = false;
var leftPressed = false;
var wordRowCount = 3;
var wordColumnCount = 5;
var wordX = 500;
var wordY = 60;
//var wordWidth = 105; //105
//var wordHeight = 40; //40
var wordWidth = 105; //105
var wordHeight = 40; //40
var wordPadding = 10;
var wordOffsetTop = 30;
var wordOffsetLeft = 30;
var wordStatus = 1;

var words = [];
words[0] = { foreign: "Konnichiwa", native: "Hello"};
words[1] = { foreign: "Arigatou gozaimasu", native: "Thank you"};
words[2] = { foreign: "Sumimasen", native: "Excuse me"};
words[3] = { foreign: "Hai", native: "Yes"};
words[4] = { foreign: "Iie", native: "No"};
/*
for (var c = 0; c < wordColumnCount; c++) {
    words[c] = [];
    for (var r = 0; r < wordRowCount; r++) {
       // words[c][r] = { x: 0, y: 0, status: 1 };
       words[c][r] = { x: 0, y: 0, status: 1 };
    }
}
*/
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function getRandomInt(max) {
    return Math. floor(Math. random() * max);
}

function keyDownHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }

}

function keyUpHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
}

function collisionDetection() {
        /*    
            playerX > wordX
            playerX < wordX + wordWidth
            playerY > wordY 
            playerY < wordY + wordHeight
        */
        if (playerX > wordX && playerX < wordX + wordWidth && playerY > wordY && playerY < wordY + wordHeight) {
            wordStatus = 0;
            
        }
    //}
}

function drawPlayer() {
    ctx.beginPath();
    ctx.rect(playerX, playerY, playerWidth, playerHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawWord() {
    ctx.beginPath();
    //ctx.rect(wordX, wordY, wordWidth, wordHeight);

    if (wordX < -40) {
        wordX = 500;
        wordStatus = 1;
        randomNum = getRandomInt(5);
    }

    if (wordStatus == 1) {
        //ctx.fillText("Japanese", wordX, wordY, wordWidth, wordHeight);
        ctx.font = "50px serif";
        //ctx.fillStyle = "#0095DD";
        ctx.fillText(words[randomNum].foreign, wordX, wordY, wordWidth, wordHeight);
        //ctx.fillText(words[randomNum].foreign, wordX, wordY);
        //ctx.rect(wordX, wordY, wordWidth, wordHeight);
    } else {
       // ctx.fillText("English", wordX, wordY, wordWidth, wordHeight);
        ctx.font = "50px serif";
        ctx.fillText(words[randomNum].native, wordX, wordY, wordWidth, wordHeight);
    }

    //ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();     
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWord();
    drawPlayer();
    collisionDetection();

    //x += dx;
    if (upPressed && playerY + dy > 0) {

        playerY += dy;

    } else if (playerY + dy < canvas.height - 50) {

      playerY -= dy;

    }
    wordX -= 1;
    //y += playerY;
}
//performs draw steps every 10 milliseconds
var randomNum = getRandomInt(5);
var interval = setInterval(draw, 10);