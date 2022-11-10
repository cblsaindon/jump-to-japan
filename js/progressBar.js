/////////////////////PROGRESS BAR///////////////////////
var powerupReady = false;
var powerupRate = 1; //HOW FAST THE POWERUP BAR FILLS

function moveProgress(direction) //FILLS IN OR SUBTRACTS FROM THE PROGRESS BAR DEPENDING ON THE POWER-UP STATE
{

    //var elem = document.getElementById("myBar").visibility = "visible";

    var elem = document.getElementById("myBar");
    //var direction = "up";
    
    if (direction == "up" && progressWidth >= 100) {
      //nothing

      document.getElementById("powerupButton").innerHTML = "Powerup ready!";
      powerupReady = true;
      togglePowerupState(powerupReady);

    } else if (direction == "up") {
      progressWidth += powerupRate;
      barPercentage = Math.round(progressWidth)  + '%'

      if (compactMode) {
        barText.textContent = barPercentage;
        barImage.setAttributeNS(null,"width",progressWidth*3);  //WIDTH
      } else {
        elem.style.width = progressWidth + '%';
        elem.innerHTML =  barPercentage;
      }
    } else if (direction == "down" && progressWidth > 0) {
        //burn it all!
        progressWidth -= powerupRate;

        barPercentage = Math.round(progressWidth)  + '%'

        if (compactMode) {
          barText.textContent = barPercentage;
          barImage.setAttributeNS(null,"width",progressWidth*3);  //WIDTH
        } else {
          elem.style.width = progressWidth + '%';
          elem.innerHTML =  barPercentage;
        }
    } else {
        //no action is needed
    }
  }

  
  function clearProgress() //BRINGS THE PROGRESSBAR BACK TO 0$
  {
    var elem = document.getElementById("myBar");
    var id = setInterval(frame, 10);
    clearInterval(id);  
  }