
var player = document.createElementNS(svgNS,"g"); //CREATE GROUP FOR THE PLAYER
var target; //CURRENT PLATFORM
    
var playerJumpSpeed = -10; //DEFAULT -10
var playerFallSpeed = 0.1; //DEFAULT 0.1
var playerMovementSpeed = 5; //DEFAULT 5

var autoJump = false;

function initPlayer()
{
  createPlayer(); //CREATE THE PLAYER
}

function createPlayer() //THE PLAYER GETS DRAWN, UPDATED, AND CHECKED FOR COLLISIONS
{

  playerBody = document.createElementNS(svgNS,"rect"); //CREATE RECT WHICH REPRESENTS THE PLAYER
  playerBody.setAttributeNS(null,"x",w/5); //START X = CENTER OF SCREEN 
  playerBody.setAttributeNS(null,"y",h/40); //START Y -> OFFSCREEN
  playerBody.setAttributeNS(null,"width",w/30);   //WIDTH
  playerBody.setAttributeNS(null,"height",h/5);   //HEIGHT
  playerBody.setAttributeNS(null,"fill","black");   //FILLCOLOR
  playerBody.setAttributeNS(null,"rx","3");   //FILLCOLOR

  player.appendChild(playerBody) //PUT THE PLAYER INSIDE THE "player" GROUP

  player.velocity = { x: 0, y: 5 }; //VELOCITY OF THE PLAYER
  player.position = { x: 0, y: 0 }; //TRANSFORM VALUE OF THE PLAYER
  player.onFloor = false;
  player.onEdgeLeft = false;
  player.onEdgeRight = false;

  SVG.appendChild(player); //APPEND THE "player" GROUP TO THE SVG ELEMENT
}

function intersectRect(r1, r2) {
    //CHECK IF THE TWO RECTANGLES OVERLAP
  return !(r2.left > r1.right || 
           r2.right < r1.left || 
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
}

function updatePlayer(dt)
{
  //turn off the powerup if the progress bar is drained
  if (progressWidth <= 0) {
    setPowerupEvent(false);
  } 

  if (powerupActiveOne == true)
  {
    player.velocity.x = 15 * (!!keys[39] - !!keys[37]) // right - left
    platformHeight = h/3;
    platform.setAttributeNS(null,"font-size", platformHeight);  //WIDTH
  } else {
    player.velocity.x = playerMovementSpeed * (!!keys[39] - !!keys[37]) // right - left
    platformHeight = h/5;
    platform.setAttributeNS(null,"font-size", platformHeight);  //WIDTH
  }

  player.velocity.y += playerFallSpeed // Acceleration due to gravity DETERMINES FALL SPEED
    
  var nextY = player.position.y + player.velocity.y * dt * 60/1000; //GET THE NEXT POSSIBLE Y POSITION
     
  var BB_Player = player.getBoundingClientRect(); //GET PLAYER BOUNDING BOX
  BB_Player.bottom += player.velocity.y * dt * 60/1000;
  BB_Player.top += player.velocity.y * dt * 60/1000;
    
  var BB_Platform = platform.getBoundingClientRect(); //CHECK COLLISION FOR EACH PLATFORM ON SCREEN

  if(intersectRect(BB_Player,BB_Platform)) //CHECK IF TWO BOUNDING BOXES OVERLAP
  {

    if(player.velocity.y < 0 && !player.onFloor)   //IF PLAYER IS JUMPING, CHANGE TO ENGLISH
    {
      player.velocity.y = (BB_Platform.bottom - BB_Player.top);
      updateScore("UP");
      translatePlatform();
    }


  else if(player.velocity.y > 0) //IF PLAYER IS FALLING, CHANGE TO ENGLISH
  {
    player.velocity.y=(BB_Platform.top - BB_Player.bottom)/4;
    updateScore("DOWN");
    translatePlatform();
  }
  } else {platform.setAttributeNS(null, "stroke", "none");}


  if(intersectRect(BB_Player,ground.getBoundingClientRect()) && !player.onFloor)  //CHECK COLLISION FOR THE GROUND
  {
    player.velocity.y = ground.getBoundingClientRect().top-BB_Player.bottom;
    target = null;

    if(ground.position.y > 100) //PLAYER IS OFFSCREEN
    {
      player.position = {x:0,y:0};
      ground.position = {x:0,y:0};
    }
  }

  player.position.y += player.velocity.y * dt * 60/1000; //GET NEW Y POSITION
  player.position.x += player.velocity.x * dt * 60/1000; //GET NEW X POSITION

  if(player.position.y <= 0) //CHECK COLLISION FOR THE ROOF
  {

    player.position = {
      x:player.position.x,y:0 //DEFAULT 0
    };
    //player.velocity.y = playerFallSpeed // Acceleration due to gravity JUMP SPEED
  }

  var leftEdge = (-1*(w/5)); //THE LEFT EDGE OF SVG ELEMENT
  var rightEdge = w/1.3; //THE RIGHT EDGE OF SVG ELEMENT

  if(player.position.x <= (leftEdge)) //CHECK COLLISION FOR THE LEFT EDGE
  {

    player.position = {x:leftEdge,y:player.position.y};
  } else if(player.position.x >= rightEdge) //CHECK COLLISION FOR THE RIGHT EDGE
  { 

    player.position = {x:rightEdge,y:player.position.y};
  }

  player.setAttribute("transform", "translate(" + player.position.x + " "+player.position.y+" )"); //TRANSFORM TO NEW POSITION

  player.onFloor = (nextY > player.position.y);


  if (nextY != player.position.y) { //WHAT HAPPENS WHEN PLAYER IS ON THE FLOOR
    //alert(nextY);
    player.velocity.y = 0; //DEFAULT 0
  }

  if (autoJump == true) {

    if (player.onFloor) { //TODO: REFERENCE THE GROUND // Acceleration due to gravity JUMP SPEED
      player.velocity.y = -20;
    } else if (player.position.y <= 0) {//CHECK COLLISION FOR THE ROOF
      player.position = {
        x:player.position.x,y:0 //DEFAULT 0
      };
      player.velocity.y += 20 // Acceleration due to gravity DETERMINES FALL SPEED
    }

  }


  if(keys[38] && player.onFloor) //JUMP
  {
    player.velocity.y = playerJumpSpeed; // Acceleration due to gravity JUMP SPEED
    target = null;
  }
}