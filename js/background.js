
var nextBackgroundX = 0;
var incrmentalBackgroundX = 1;

function initBackground() {
    SVG.style.backgroundPositionY = "-350px";
}

function updateBackground(dt) { //BACKGROUND SPEED TIED TO WORD/PLATFORM SPEED
  nextBackgroundX -= platform.velocity.x * dt * 60/1000;
  SVG.style.backgroundPositionX = nextBackgroundX+"px";
 }
 