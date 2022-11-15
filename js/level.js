
var SVG = document.getElementById("SVG_scene"); //MAIN SVG ELEMENT
var w = document.getElementById("SVG_scene").clientWidth; //GET WINDOW WIDTH
var h = document.getElementById("SVG_scene").clientHeight; //GET WINDOW HEIGHT
var ground; //GROUND ELEMENT
var score; //SCORE ELEMENT

var progressWidth = 1;
var popup = document.getElementById("myPopup");
var svgNS = "http://www.w3.org/2000/svg";   //DEFINE THE namespaceURI

var playerScore = 0;
var translationToggle = 0;

var levelCount = 0; //INCREMENTS WITH EACH WORD
var compactMode = true; //CONDENSED VERSION OF GUI FOR SMALLER WINDOWS

function initLevel() //INITIALIZES THE SVG ELEMENT DIMENSIONS, LEVEL, SCORE, AND BOOK DATA
{

  platformHeight = h/5;
  createLevel(); //CREATE LEVEL
  score();

  //DRAW STATS ON GAME SCREEN IF THE CSS SAYS ITS ENOUGH TO HIDE THE TOP CONTAINER
  let topContainer = document.getElementById("GameScreenContainer");
  let isDisplay = window.getComputedStyle(topContainer).display;
  if (isDisplay == "none")  {
    compactMode = true; 
  } else if (isDisplay == "block") {
    compactMode = false; 
  } else {
    compactMode = false; 
  }

  if (compactMode)  {
    createStats();
  } 

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    popup.textContent = "Tap anywhere in the game screen to Jump";

   } else { //COMPUTER
    popup.textContent = "Use the left, right, and up arrow keys to move";
   }
   playPopUp();
}

function createLevel() //DRAWS THE SVG CONTAINER, GROUND, AND WORD
{
  let level = document.createElementNS(svgNS,"g"); //CREATE A GROUP FOR THE ENTIRE LEVEL

  ground = document.createElementNS(svgNS,"rect"); //CREATE A RECT WHICH REPRESENT THE GROUND
  ground.setAttributeNS(null,"x",0);  //START X
  ground.setAttributeNS(null,"y",h-10);  //START Y
  ground.setAttributeNS(null,"width",w);  //WIDTH
  ground.setAttributeNS(null,"height",50);   //HEIGHT
  ground.setAttributeNS(null,"fill","#2F4858");   //FILLCOLOR
  ground.position = { x: 0, y: 0 }; //TRANSFORM VALUE OF THE GROUND

  platform = document.createElementNS(svgNS,"text"); //CREATE A RECT WHICH REPRESENT ONE PLATFORM
  platform.setAttributeNS(null,"x",w/2); //START X -> STARTS OFFSCREEN
  platform.setAttributeNS(null,"y",h/2);    //START Y
  platform.setAttributeNS(null,"font-size", platformHeight);  //WIDTH
  platform.setAttributeNS(null,"rotate",4); //ADDS A FUN TWIST TO WORDS

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

function createStats() {

  
  pagesCompact = document.createElementNS(svgNS,"text"); //CREATE A RTEXT NODE
  pagesCompact.setAttributeNS(null,"x",w*.8); //START X 
  pagesCompact.setAttributeNS(null,"y",h/5);    //START Y
  pagesCompact.setAttributeNS(null,"fill","white"); //FILLCOLOR
  pagesCompact.setAttributeNS(null,"font-family","helvetica"); //FONT
  pagesCompact.setAttributeNS(null,"font-weight","bold"); //FONT-WEIGHT
  pagesCompact.setAttributeNS(null, "stroke-width", "0.2%");
  
  pagesCompact.textContent ="";  //TEXT

  SVG.appendChild(pagesCompact) //APPEND LEVEL TO THE SVG ELEMENT


  book = document.createElementNS(svgNS,"text"); //CREATE A RTEXT NODE
  book.setAttributeNS(null,"x",w/50); //START X 
  book.setAttributeNS(null,"y",h/5);    //START Y
  book.setAttributeNS(null,"fill","white"); //FILLCOLOR
  book.setAttributeNS(null,"font-family","helvetica"); //FONT
  book.setAttributeNS(null,"font-weight","bold"); //FONT-WEIGHT
 // book.setAttributeNS(null, "stroke", "white");
  book.setAttributeNS(null, "stroke-width", "0.2%");

  book.textContent =bookMenuName;  //TEXT
  SVG.appendChild(book) //APPEND LEVEL TO THE SVG ELEMENT

  barImage = document.createElementNS(svgNS,"rect"); //CREATE A RTEXT NODE
  barImage.setAttributeNS(null,"x",w/3.5); //START X 
  barImage.setAttributeNS(null,"y",h/8.5);    //START Y
  barImage.setAttributeNS(null,"width",progressWidth);  //WIDTH
  barImage.setAttributeNS(null,"height",15);   //HEIGHT
  barImage.setAttributeNS(null,"fill","#2196F3");   //FILLCOLOR
  barImage.setAttributeNS(null,"rx","3");   //FILLCOLOR
  SVG.appendChild(barImage) //APPEND LEVEL TO THE SVG ELEMENT

  barText = document.createElementNS(svgNS,"text"); //CREATE A RTEXT NODE
  barText.setAttributeNS(null,"x",w/3.4); //START X 
  barText.setAttributeNS(null,"y",h/5);    //START Y
  barText.setAttributeNS(null,"fill","white"); //FILLCOLOR
  barText.setAttributeNS(null,"font-family","helvetica"); //FONT
  barText.setAttributeNS(null,"font-weight","bold"); //FONT-WEIGHT
  //barText.setAttributeNS(null, "stroke", "white");
  barText.setAttributeNS(null, "stroke-width", "0.2%");

  barText.textContent ="0%";  //TEXT
  SVG.appendChild(barText) //APPEND LEVEL TO THE SVG ELEMENT
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
    updateLevelCount();
    //drawHistory();
    activePlatforms -=1;
  }

  platform.position.x -= platform.velocity.x * dt * 60/1000;//GET THE NEW X POSITION
  platform.position.y -= platform.velocity.y * dt * 60/1000;//GET THE NEW X POSITION

  platform.setAttribute("transform", "translate(" + platform.position.x + " "+ platform.position.y +" )");//TRANSFORM TO THE NEXT X POSITION   

}
