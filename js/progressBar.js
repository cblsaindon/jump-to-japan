/////////////////////PROGRESS BAR///////////////////////
var powerupReady = false;
var powerupRate = 100; //HOW FAST THE POWERUP BAR FILLS
var pageFlag = true;
var tempDollars = 0;

function moveProgress(direction) //FILLS IN OR SUBTRACTS FROM THE PROGRESS BAR DEPENDING ON THE POWER-UP STATE
{

    //var elem = document.getElementById("myBar").visibility = "visible";

    var elem = document.getElementById("myBar");
    
    //var direction = "up";

    if (direction == "up" && progressWidth >= 100) {
      //nothing
      pageFlag = "false"; //TRIGGER INCREMENT PAGE
      document.getElementById("powerupButton").innerHTML = "Turn page!";
      //tempDollars = 100;
      powerupReady = true;
      elem.innerHTML =  "100%";
      togglePowerupState(powerupReady);

    } else if (direction == "up") {

      progressWidth = progressWidth + (powerupRate/pageCost);

      if (progressWidth > 100) {progressWidth = 100;}

      if (compactMode) {
        barText.textContent = Math.round(progressWidth) + "%";
        barImage.setAttributeNS(null,"width",progressWidth*3);  //WIDTH
      } else { //FULL MODE
        elem.style.width = progressWidth + "%";
        elem.innerHTML =  Math.round(progressWidth) + '%';
      }

    } else if (direction == "down" && progressWidth > 0) {
        //burn it all!
        //progressWidth = progressWidth - (powerupRate/pageCost);
        progressWidth = progressWidth - 1;
        if (progressWidth < 0) {progressWidth = 0;}

        if (compactMode) {
          barText.textContent = Math.round(progressWidth) + "%";
          barImage.setAttributeNS(null,"width",progressWidth*3);  //WIDTH
        } else {
          elem.style.width = progressWidth + '%';
          elem.innerHTML =  Math.round(progressWidth) + "%";
        }
    } else {
        //no action is needed
    }
  }

  
  function clearProgress() //BRINGS THE PROGRESSBAR BACK TO 0%
  {
    var elem = document.getElementById("myBar");
    var id = setInterval(frame, 10);
    clearInterval(id);  
  }