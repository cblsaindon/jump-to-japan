var powerupActiveOne = false;
const powerupButton = document.querySelector("#powerupButton");

function setPowerupButton(powerupReady) //ALLOWS THE USER TO CLICK OR NOT CLICK THE POWER-UP DEPENDING ON THE CHARGING STATUS
{
  var e = document.getElementById("powerupButton");
  if (powerupReady == true) { //make sure it can be clicked and give it a good format
  e.className = e.className.replace(" disabled"," enabled");
  } else { //grey the button out and can't be clicked
    e.className = e.className.replace(" enabled"," disabled");
  }
}

powerupButton.addEventListener('click', () =>
{
  setPowerupEvent(true);
});  


function setPowerupEvent(powerupReady) //ACTIVATES OR DEACTIVATES POWER-UP FEATURES
{
  if (powerupReady == true && progressWidth == 100) {
    startPowerupEvent();

  } else if(powerupReady == false) {
    endPowerupEvent();

  }
}

function startPowerupEvent() {
  powerupActiveOne = true;
  document.getElementById("powerupButton").innerHTML = "Turning power!";
  setPowerupButton(false);

  platformSpeed = 30;
  platform.velocity = { x: platformSpeed, y: 0 }; //VELOCITY OF THE PLATFORM
  autoJump = true;

  var e = document.getElementById("myBar");
  if (compactMode) {
    barImage.setAttributeNS(null,"fill","#FCC201");   //FILL BAR COLOR
  } else {
    if (e.className.indexOf("w3-blue") != -1) { e.className = e.className.replace(" w3-blue", " w3-amber");}
  }
}

function endPowerupEvent() {
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

