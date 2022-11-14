var powerupActiveOne = false;

//TODO: ARGUMENTS NEED TO BE FIXED, CONFUSING

function togglePowerupState(isReady) //ALLOWS THE USER TO CLICK OR NOT CLICK THE POWER-UP DEPENDING ON THE CHARGING STATUS
{
  var e = document.getElementById("powerupButton");
  if (powerupReady == true) { //make sure it can be clicked and give it a good format
  e.className = e.className.replace(" disabled"," enabled");
  } else { //grey the button out and can't be clicked
    e.className = e.className.replace(" enabled"," disabled");
  }
}

function togglePowerup(isStart) //ACTIVATES OR DEACTIVATES POWER-UP FEATURES
{
  //only able to activate the powerup feature when the progress bar is full
  //alert(progressWidth);
  if (isStart == true && progressWidth == 100)
  {

    powerupActiveOne = true;
    document.getElementById("powerupButton").innerHTML = "Turning power!";
    powerupReady = false;
    togglePowerupState(powerupReady);

    //INCREASE PLATFORM/WORD SPEED
    platformSpeed = 30;
    platform.velocity = { x: platformSpeed, y: 0 }; //VELOCITY OF THE PLATFORM
    autoJump = true;

    var e = document.getElementById("myBar");
    if (compactMode) {
      barImage.setAttributeNS(null,"fill","#FCC201");   //FILLCOLOR
    } else {
      if (e.className.indexOf("w3-blue") != -1) { e.className = e.className.replace(" w3-blue", " w3-amber");}
    }


  } else if(isStart == false) {
    powerupActiveOne = false;
    if (pageFlag == "false") {
      incrementPage();
    }
    changePlatformSpeed();
    autoJump = false;
    document.getElementById("powerupButton").innerHTML = "Reading...";

    if (compactMode) {
      barImage.setAttributeNS(null,"fill","#2196F3");   //FILLCOLOR
    } else {
      var e = document.getElementById("myBar");
      if (e.className.indexOf("w3-amber") != -1) { e.className = e.className.replace(" w3-amber", " w3-blue");}
    }
  }
}

const powerupButton = document.querySelector("#powerupButton");

powerupButton.addEventListener('click', () =>
{
  togglePowerup(true);
});  
