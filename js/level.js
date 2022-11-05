
var SVG; //MAIN SVG ELEMENT
var w; //WIDTH OF THE SVG ELEMENT
var h; //HEIGHT OF THE SVG ELEMENT
var ground; //GROUND ELEMENT
var score; //SCORE ELEMENT

var platformTextEnglish; //THE ENGLISH VERSION OF THE WORD
var platformTextJapanese; //THE JAPANESE VERSION OF THE WORD
var platform; //THE WORD
var platformSpeed = 3; //THE WORD VELOCITY
var maxPlatforms = 20; //MAX PLATFORMS TO PREPARE
var platformsArray = []; //STORES ALL PLATFORMS IN A ARRAY
var activePlatforms = 0; //PLATFORMS CURRENTLY ON THE SCREEN
var maxActivePlatforms = 1; //MAX PLATFORMS ON THE SCREEN

var activeBookNumber = 1;
var activeBookWords;

var playerScore = 0;
var translationToggle = 0;
var bookMenuName = "Essentials";


function initLevel() //INITIALIZES THE SVG ELEMENT DIMENSIONS, LEVEL, SCORE, AND BOOK DATA
{
  SVG = document.getElementById("SVG_scene"); //GET SVG ELEMENT

  w = document.getElementById("SVG_scene").clientWidth; //GET WINDOW WIDTH
  h = document.getElementById("SVG_scene").clientHeight; //GET WINDOW HEIGHT

  platformHeight = h/5;
  createLevel(); //CREATE LEVEL
  score();
}

function toggleTranslate() //SWITCHES JAPANESE AND ENGLISH BOOLEAN
{
  if (translationToggle == 0) { //**** JAPANESE ***//
    translationToggle = 1;
  } else { //**** ENGLISH ***//
    translationToggle = 0;
  }
}

function changePlatformSpeed() //ADJUST WORD SPEED BASED ON THE SETTINGS SLIDER
{    
  platformSpeed = document.getElementById("speedSlider").value;
  platform.velocity = { x: platformSpeed, y: 0 }; //VELOCITY OF THE PLATFORM
}

function createLevel() //DRAWS THE SVG CONTAINER, GROUND, AND WORD
{
  var svgNS = "http://www.w3.org/2000/svg";   //DEFINE THE namespaceURI
  var level = document.createElementNS(svgNS,"g"); //CREATE A GROUP FOR THE ENTIRE LEVEL
    
  ground = document.createElementNS(svgNS,"rect"); //CREATE A RECT WHICH REPRESENT THE GROUND
  ground.setAttributeNS(null,"x",0);  //START X
  ground.setAttributeNS(null,"y",h-10);  //START Y
  ground.setAttributeNS(null,"width",w);  //WIDTH
  ground.setAttributeNS(null,"height",50);   //HEIGHT
  ground.setAttributeNS(null,"fill","green");   //FILLCOLOR
  ground.position = { x: 0, y: 0 }; //TRANSFORM VALUE OF THE GROUND

  platform = document.createElementNS(svgNS,"text"); //CREATE A RECT WHICH REPRESENT ONE PLATFORM
  platform.setAttributeNS(null,"x",w/2); //START X -> STARTS OFFSCREEN
  platform.setAttributeNS(null,"y",h/2);    //START Y
  platform.setAttributeNS(null,"font-size", platformHeight);  //WIDTH

  platform.position = { x: 0, y: 0 }; //TRANSFORM VALUE OF THE PLATFORM
  platform.velocity = { x: platformSpeed, y: 0 }; //VELOCITY OF THE PLATFORM

  level.appendChild(platform); //PUT THE PLATFORM INSIDE THE "level" GROUP
  level.appendChild(ground);//PUT THE GROUND INSIDE THE "LEVEL" GROUP
  SVG.appendChild(level) //APPEND LEVEL TO THE SVG ELEMENT
}

function getRandomInt(max) //PROVIDES A RANDOM INTEGER FOR RANDOMIZING WORDS
{
  return Math. floor(Math. random() * max);
}



function setPlatform() //DRAWS A NEW RANDOMIZED WORD
{

  //one
  client.paginate(
    q.Match(q.Index("words_by_book"), bookMenuName)
  )
  .each(
     function (res) { 
      
      var randomInt = getRandomInt(res.length); 
      platformTextJapanese=res[randomInt][0]; //[0][0] is japanese, [0][1] is english
      platformTextEnglish=res[randomInt][1]; //[0][0] is japanese, [0][1] is english

      if (translationToggle == 0) { //**** JAPANESE ***//
        platform.textContent = platformTextJapanese; 
        platform.setAttributeNS(null,"fill","#000000"); //FILLCOLOR
      } else { //**** ENGLISH ***//
        platform.textContent = platformTextEnglish; 
        platform.setAttributeNS(null,"fill","#FFFFFF"); //FILLCOLOR
      }
    }
  )
  .catch(function (err) { console.log('Error:', err) }
  )


//

  platform.position.y = (h/10); //SET Y POSITION
  platform.position.x = (w/1.5);//SET RANDOM START POSITION X RIGHT; the higher, the more right ex. 800

  activePlatforms +=1;
}

function translateWord() //TOGGLES THE WORD TO JAPANESE OR ENGLISH
{
  if (translationToggle == 0) { //**** ENGLISH ***//
    platform.textContent = platformTextEnglish; 
    platform.setAttributeNS(null,"fill","#FFFFFF"); //FILLCOLOR
    platform.setAttributeNS(null, "stroke", "#FFFFFF");

  } else { //**** JAPANESE ***//
    platform.textContent = platformTextJapanese;
    platform.setAttributeNS(null,"fill","#000000"); //FILLCOLOR 
    platform.setAttributeNS(null, "stroke", "#000000");
  }
}

function score() //TODO: REMOVE
{
  score.current = 0; //CURRENT SCORE
}

function updateScore() //INCREASES THE SCORE
{
  if (powerupActiveOne == false) {
    moveProgress("up");
    score.current += 1; //ADD TO SCORE
    playerScore =+ 1;
  } else {
    moveProgress("down");
    score.current += 9001; //ADD TO SCORE
    playerScore =+ 100;
    }
    score.textContent =Math.round(score.current);  //UPDATE SCORE
    document.getElementById("scoreLabel").textContent = score.current;
}

function updateLevel(dt) //MOVES THE WORD PLATFORM FROM RIGHT TO LEFT, AND IF IT FALLS OFF THE SCREEN, REPOSITIONS IT BACK TO THE RIGHT
{
  //UPDATE LEVEL ON EACH FRAME AND GET FRAMETIME "dt"
  if(activePlatforms < maxActivePlatforms) // SET PLATFORMS
  {
    setPlatform();
  }

  if((platform.position.x + (platform.getBBox().width)) < (w/2)*-1)//BLOCK IS OUT OF SCREEN
  {
    activePlatforms -=1;
  }

  platform.position.x -= platform.velocity.x * dt * 60/1000;//GET THE NEW X POSITION
  platform.position.y -= platform.velocity.y * dt * 60/1000;//GET THE NEW X POSITION
  platform.setAttribute("transform", "translate(" + platform.position.x + " "+ platform.position.y +" )");//TRANSFORM TO THE NEXT X POSITION   
}