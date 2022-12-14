var powerupActiveOne = false;

function togglePowerupState(isReady)
{
    var e = document.getElementById("powerupButton");
    if (powerupReady == true) { //make sure it can be clicked and give it a good format

    e.className = e.className.replace(" disabled"," enabled");
    //alert(e.className);
  } else { //grey the button out and can't be clicked
    e.className = e.className.replace(" enabled"," disabled");
  }
}

function togglePowerup(isStart)
{
 //only able to activate the powerup feature when the progress bar is full
 if (isStart == true && progressWidth == 100)
 {
    
    powerupActiveOne = true;
    document.getElementById("powerupMsg").innerHTML = "Powerup Activated!";
    powerupReady = false;
    togglePowerupState(powerupReady);

    var e = document.getElementById("myBar");
    if (e.className.indexOf("w3-blue") != -1) { 
        
        e.className = e.className.replace(" w3-blue", " w3-amber");
    }

 } else if(isStart == false) {
    powerupActiveOne = false;
    var e = document.getElementById("myBar");
    if (e.className.indexOf("w3-amber") != -1) { 
        e.className = e.className.replace(" w3-amber", " w3-blue");
    }
    document.getElementById("powerupMsg").innerHTML = "";
 }
}


//bookMenuButton
const powerupButton = document.querySelector("#powerupButton");

  //DO SOMETHING
  powerupButton.addEventListener('click', () => {
    togglePowerup(true);
    
  });  
