function score() //TODO: CURRENTLY ALL ADDITONAL DRAWING. WILL NEED TO UPDATE
{
  score = document.createElementNS(svgNS,"text"); //CREATE A RTEXT NODE
  score.current = 0; //CURRENT SCORE
}

function updateScore(direction) //INCREASES THE SCORE
{
  let bonus = 1;
  if (direction == "UP") {
    bonus = 5;
  }

  if (powerupActiveOne == false) {
    moveProgress("up",bonus);
    score.current += bonus; //ADD TO SCORE
    playerScore =+ bonus;
  } else {
    moveProgress("down",bonus);
    score.current += bonus*10; //ADD TO SCORE
    playerScore =+ bonus*10;

    }

  drawScore();
}

function drawScore() {
    document.getElementById("scoreLabel").textContent = Math.round(score.current);
}

function resetScore() {
  score.current = 0; //ADD TO SCORE
  playerScore =+ 0;
  drawScore();
}