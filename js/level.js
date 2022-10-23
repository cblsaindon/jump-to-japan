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

var translationToggle = 1;

var words = [];
words[0] = { bookNumber: "1", japanese: "Konnichiwa", english: "Hello"};
words[1] = { bookNumber: "1", japanese: "Arigatou gozaimasu", english: "Thank you"};
words[2] = { bookNumber: "1", japanese: "Sumimasen", english: "Excuse me"};
words[3] = { bookNumber: "1", japanese: "Hai", english: "Yes"};
words[4] = { bookNumber: "1", japanese: "iie", english: "No"};
words[5] = { bookNumber: "2", japanese: "Kippu", english: "Ticket"};
words[6] = { bookNumber: "2", japanese: "Shinkansen", english: "Bullet train"};
words[7] = { bookNumber: "2", japanese: "Basu", english: "Bus"};
words[8] = { bookNumber: "2", japanese: "Eki", english: "Train station"};
words[9] = { bookNumber: "2", japanese: "Mighi", english: "Right"};
words[10] = { bookNumber: "2", japanese: "Hidari", english: "Left"};
words[11] = { bookNumber: "3", japanese: "Hare", english: "Sunny"};
words[12] = { bookNumber: "3", japanese: "Sakura", english: "Cherry blossom"};
words[13] = { bookNumber: "3", japanese: "Sakana", english: "Fish"};
words[14] = { bookNumber: "3", japanese: "Yama", english: "Mountain"};
words[15] = { bookNumber: "3", japanese: "山", english: "Mountain"};
words[16] = { bookNumber: "3", japanese: "Ame", english: "Rain"};
words[17] = { bookNumber: "3", japanese: "雨", english: "Rain"};

var books = [];
books[0] = { id: "1", name: "Essentials"};
books[1] = { id: "2", name: "Travel"};
books[2] = { id: "3", name: "Nature"};

function initLevel()
{
  SVG = document.getElementById("SVG_scene"); //GET SVG ELEMENT

  w = document.getElementById("SVG_scene").clientWidth; //GET WINDOW WIDTH
  h = document.getElementById("SVG_scene").clientHeight; //GET WINDOW HEIGHT

  platformHeight = h/5;
  createLevel(); //CREATE LEVEL
  score();
  changeBook(1);
}

function toggleTranslate()
{
  if (translationToggle == 0) { //**** JAPANESE ***//
    translationToggle = 1;
  } else { //**** ENGLISH ***//
    translationToggle = 0;
  }
}

function changePlatformSpeed()
{    
  platformSpeed = document.getElementById("speedSlider").value;
  platform.velocity = { x: platformSpeed, y: 0 }; //VELOCITY OF THE PLATFORM
}

function createLevel()
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

function getRandomInt(max) {
  return Math. floor(Math. random() * max);
}



function setPlatform()
{
  //SET A NEW PLATFORM WITH A RANDOM WORD 
  var randomInt = getRandomInt(activeBookWords.length); 

  platformTextJapanese = activeBookWords[randomInt].japanese;
  platformTextEnglish = activeBookWords[randomInt].english;

  if (translationToggle == 0) { //**** JAPANESE ***//
    platform.textContent = platformTextJapanese; 
    platform.setAttributeNS(null,"fill","#000000"); //FILLCOLOR
  } else { //**** ENGLISH ***//
    platform.textContent = platformTextEnglish; 
    platform.setAttributeNS(null,"fill","#FFFFFF"); //FILLCOLOR
  }

  platform.position.y = (h/10); //SET Y POSITION
  platform.position.x = (w/2);//SET RANDOM START POSITION X RIGHT; the higher, the more right ex. 800

  activePlatforms +=1;
}

function translateWord() {
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

function score()
{
  score.current = 0; //CURRENT SCORE
}

function updateScore()
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

function updateLevel(dt)
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