/////////////////////PROGRESS BAR///////////////////////
var powerupReady = false;

function moveProgress(direction) {
    //var elem = document.getElementById("myBar").visibility = "visible";

    var elem = document.getElementById("myBar");
    //var direction = "up";
    
    if (direction == "up" && progressWidth >= 100) {
      //nothing

      document.getElementById("powerupButton").innerHTML = "Powerup ready!";
      powerupReady = true;
      togglePowerupState(powerupReady);

    } else if (direction == "up") {
      progressWidth++;
      elem.style.width = progressWidth + '%';
      elem.innerHTML = progressWidth * 1  + '%';
    } else if (direction == "down" && progressWidth > 0) {
        //burn it all!
        //alert("sdafdsfasd");
        progressWidth--;
        elem.style.width = progressWidth + '%';
        elem.innerHTML = progressWidth * 1  + '%';
    } else {
        //no action is needed
    }
  }
  
  
  function clearProgress() {
    var elem = document.getElementById("myBar");
    var id = setInterval(frame, 10);
    clearInterval(id);  
  }