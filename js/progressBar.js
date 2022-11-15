/////////////////////PROGRESS BAR///////////////////////
var powerupReady = false;
var powerupRate = 100; //HOW FAST THE POWERUP BAR FILLS
var pageFlag = true;
var tempDollars = 0;
var barElem = document.getElementById("myBar");


function moveProgress(direction,bonus) //FILLS IN OR SUBTRACTS FROM THE PROGRESS BAR DEPENDING ON THE POWER-UP STATE
{

    if (direction == "up" && progressWidth >= 100) {

      pageFlag = "false"; //TRIGGER INCREMENT PAGE
      document.getElementById("powerupButton").innerHTML = "Turn page!";

      barElem.innerHTML =  "100%";
      setPowerupButton(true);

    } else if (direction == "up") {
      moveProgressUp(bonus);

    } else if (direction == "down" && progressWidth > 0) {
      moveProgressDown(bonus);
    }
  }

  function moveProgressUp(bonus) {
    //let elem = document.getElementById("myBar");
  
    progressWidth = progressWidth + ((powerupRate/pageCost)*bonus);
  
    if (progressWidth > 100) {progressWidth = 100;}
  
    if (compactMode) {
      barText.textContent = Math.round(progressWidth) + "%";
      barImage.setAttributeNS(null,"width",progressWidth*3);  //WIDTH
    } else { //FULL MODE
      barElem.style.width = progressWidth + "%";
      barElem.innerHTML =  Math.round(progressWidth) + '%';
    }
  }
  
  function moveProgressDown(bonus) {
            //burn it all!
        //progressWidth = progressWidth - (powerupRate/pageCost);
        progressWidth = progressWidth - (1*bonus);
        if (progressWidth < 0) {progressWidth = 0;}

        if (compactMode) {
          barText.textContent = Math.round(progressWidth) + "%";
          barImage.setAttributeNS(null,"width",progressWidth*3);  //WIDTH
        } else {
          barElem.style.width = progressWidth + '%';
          barElem.innerHTML =  Math.round(progressWidth) + "%";
        }
  }
  
  function clearProgress() //BRINGS THE PROGRESSBAR BACK TO 0%
  {
    var id = setInterval(frame, 10);
    clearInterval(id);  
  }