var player; //PLAYER ELEMENT
var target; //CURRENT PLATFORM

function initPlayer()
{
    createPlayer(); //CREATE THE PLAYER
}

function createPlayer()
{
    var svgNS = "http://www.w3.org/2000/svg";   //DEFINE THE namespaceURI
    
    player = document.createElementNS(svgNS,"g"); //CREATE GROUP FOR THE PLAYER
    
    playerBody = document.createElementNS(svgNS,"rect"); //CREATE RECT WHICH REPRESENTS THE PLAYER
    playerBody.setAttributeNS(null,"x",w/2-25); //START X = CENTER OF SCREEN 
    //playerBody.setAttributeNS(null,"y",-100); //START Y -> OFFSCREEN
    playerBody.setAttributeNS(null,"y",h/40); //START Y -> OFFSCREEN
    playerBody.setAttributeNS(null,"width",w/30);   //WIDTH
    playerBody.setAttributeNS(null,"height",h/5);   //HEIGHT
    playerBody.setAttributeNS(null,"fill","black");   //FILLCOLOR
    
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
    player.velocity.x = 3 * (!!keys[39] - !!keys[37]) // right - left
    player.velocity.y += 0.1 // Acceleration due to gravity
    
    var nextY = player.position.y + player.velocity.y * dt * 60/1000; //GET THE NEXT POSSIBLE Y POSITION
    var nextX = player.position.x + player.velocity.x * dt * 60/1000; //GET THE NEXT POSSIBLE Y POSITION
     
    var BB_Player = player.getBoundingClientRect(); //GET PLAYER BOUNDING BOX
        BB_Player.bottom += player.velocity.y * dt * 60/1000;
        BB_Player.top += player.velocity.y * dt * 60/1000;
    
    //CHECK COLLISION FOR EACH PLATFORM ON SCREEN
            var BB_Platform = platform.getBoundingClientRect();
            //CHECK IF TWO BOUNDING BOXES OVERLAP
            if(intersectRect(BB_Player,BB_Platform)) 
            {
                //IF PLAYER IS JUMPING
                if(player.velocity.y < 0 && !player.onFloor)
                {
                    player.velocity.y = (BB_Platform.bottom - BB_Player.top);
                    //**************CHANGE TO ENGLISH*****************//
                    //alert("Hit box while jumping");
                    updateScore();
                    translateWord();

                }
                
                //IF PLAYER IS FALLING
                else if(player.velocity.y > 0)
                {
                    player.velocity.y=(BB_Platform.top - BB_Player.bottom)/4;//target = platformsArray[i];
                    //**************CHANGE TO ENGLISH*****************//
                    //alert("Hit box while falling");

                    updateScore();
                    translateWord();


                }
            }

    //CHECK COLLISION FOR THE GROUND
    if(intersectRect(BB_Player,ground.getBoundingClientRect()) && !player.onFloor)
    {
        player.velocity.y = ground.getBoundingClientRect().top-BB_Player.bottom;
        target = null;
        
        if(ground.position.y > 100) //IF GROUND IS ALREADY OFFSCREEN -> PLAYER DEAD
        {
            //RESET LEVEL
            //activePlatforms = 0;
            //score.current = 0;
            //score.textContent =Math.round(score.current);
            player.position = {x:0,y:0};
            ground.position = {x:0,y:0};
        }
    }


    /*
    if(target) //IF ON PLATFORM
    {
        player.velocity.x += target.velocity.x;
    }
    */


    player.position.y += player.velocity.y * dt * 60/1000;  //GET NEW Y POSITION
    player.position.x += player.velocity.x * dt * 60/1000;  //GET NEW X POSITION

    //CHECK COLLISION FOR THE ROOF
    if(player.position.y <= 0)
    {
        player.position = {x:player.position.x,y:0};
    }

    //CHECK COLLISION FOR THE EDGES
    var leftEdge = ((w/2)*-1)+30;
    var rightEdge = ((w/2));
    if(player.position.x <= (leftEdge))     //CHECK COLLISION FOR THE LEFT EDGE
    {
        //alert(player.position.x);
        player.position = {x:leftEdge,y:player.position.y};

    } else if(player.position.x >= rightEdge) {     //CHECK COLLISION FOR THE LEFT EDGE
        player.position = {x:rightEdge,y:player.position.y};
    }

    player.setAttribute("transform", "translate(" + player.position.x + " "+player.position.y+" )"); //TRANSFORM TO NEW POSITION
    
    player.onFloor = (nextY > player.position.y);


    if (nextY != player.position.y) {player.velocity.y = 0};
    
/*    
    //player.onEdgeLeft = (nextX <= 0);
    player.onEdgeRight = (player.position.x > w-400);
    if(player.onEdgeLeft || player.onEdgeRight) {
        //alert(player.position.x + "." + w);
        player.velocity.x = 0;
    } else {
        
    }
*/
    if(keys[38] && player.onFloor)
    {
        player.velocity.y = -10 // Acceleration due to gravity
        target = null;
    }
}