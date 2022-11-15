function score() //TODO: CURRENTLY ALL ADDITONAL DRAWING. WILL NEED TO UPDATE
{
  score = document.createElementNS(svgNS,"text"); //CREATE A RTEXT NODE
  score.current = 0; //CURRENT SCORE
}

function updateScore(direction) //INCREASES THE SCORE
{
  let bonus = 10;
  if (direction == "UP") {
    bonus = 10; //DEFAULT 10
  }

  if (powerupActiveOne == false) {
    moveProgress("up",1);
    score.current += 1; //ADD TO SCORE DEFAULT 1
    playerScore =+ 1;
  } else {
    moveProgress("down",bonus);
    score.current += bonus; //ADD TO SCORE
    playerScore =+ bonus;

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