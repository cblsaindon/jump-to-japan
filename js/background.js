//var imgHeight = 0;
//var scrollSpeed = 10;

var nextBackgroundX = 0;
var incrmentalBackgroundX = 1;
var gameScene = document.getElementById("SVG_scene");


function initBackground() {


}

function updateBackground(dt) { //BACKGROUND SPEED TIED TO WORD/PLATFORM SPEED
  nextBackgroundX -= platform.velocity.x * dt * 60/1000;
  gameScene.style.backgroundPositionX = nextBackgroundX+"px";
 }
 