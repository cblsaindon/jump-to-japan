var SVG; //MAIN SVG ELEMENT
var w; //WIDTH OF THE SCREEN
var h; //HEIGHT OF THE SCREEN
var translationToggle = 1;
var ground; //GROUND ELEMENT
//var roofX; //ROOF ELEMENT
var score; //SCORE ELEMENT
var maxPlatforms = 20; //MAX PLATFORMS TO PREPARE
var platformsArray = []; //STORES ALL PLATFORMS IN A ARRAY
var platform;
var activePlatforms = 0; //PLATFORMS CURRENTLY ON THE SCREEN
var maxActivePlatforms = 1; //MAX PLATFORMS ON THE SCREEN -> DIFFICULTY

var platformTextNative;
var platformTextForeign;

var words = [];
words[0] = { foreign: "Konnichiwa", native: "Hello"};
words[1] = { foreign: "Arigatou gozaimasu", native: "Thank you"};
words[2] = { foreign: "Sumimasen", native: "Excuse me"};
words[3] = { foreign: "Hai", native: "Yes"};
words[4] = { foreign: "iie", native: "No"};

function initLevel()
{
    //alert("init level!");
    SVG = document.getElementById("SVG_scene"); //GET SVG ELEMENT

    //w = window.innerWidth/2; //GET WINDOW WIDTH
    //h = window.innerHeight/2; //GET WINDOW HEIGHT
    w = document.getElementById("SVG_scene").clientWidth; //GET WINDOW WIDTH
    h = document.getElementById("SVG_scene").clientHeight; //GET WINDOW HEIGHT

    createLevel(); //CREATE LEVEL
    score();
}

function toggleTranslate()
{
    if (translationToggle == 0) { //**** JAPANESE ***//
        translationToggle = 1;
    } else { //**** ENGLISH ***//
        translationToggle = 0;
    }
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

    
    //CREATE "maxPlatforms" PLATFORMS

         platform = document.createElementNS(svgNS,"text"); //CREATE A RECT WHICH REPRESENT ONE PLATFORM
            platform.setAttributeNS(null,"x",w/2); //START X -> STARTS OFFSCREEN
            platform.setAttributeNS(null,"y",h/2);    //START Y
            platform.setAttributeNS(null,"font-size",w/20);  //WIDTH

            platform.position = { x: 0, y: 0 }; //TRANSFORM VALUE OF THE PLATFORM
            platform.velocity = { x: 3, y: 0 }; //VELOCITY OF THE PLATFORM
    
            level.appendChild(platform); //PUT THE PLATFORM INSIDE THE "level" GROUP

    level.appendChild(ground);//PUT THE GROUND INSIDE THE "LEVEL" GROUP
    SVG.appendChild(level) //APPEND LEVEL TO THE SVG ELEMENT
}

function getRandomInt(max) {
    return Math. floor(Math. random() * max);
}

function setPlatform()
{

    //SET A NEW RANDOM PLATFORM POSITION 
    var randomInt = getRandomInt(4);

    platformTextForeign = words[randomInt].foreign;
    platformTextNative = words[randomInt].native;

    if (translationToggle == 0) { //**** JAPANESE ***//
        platform.textContent = platformTextForeign; 
        platform.setAttributeNS(null,"fill","#000000"); //FILLCOLOR
    } else { //**** ENGLISH ***//
        platform.textContent = platformTextNative; 
        platform.setAttributeNS(null,"fill","#FFFFFF"); //FILLCOLOR
    }

    platform.position.y = (h/10); //SET Y POSITION
    platform.position.x = (w/2);//SET RANDOM START POSITION X RIGHT; the higher, the more right ex. 800

    platform.velocity.x = 3;//Math.random()*4+1;//SET RANDOM START VELOCITY

    activePlatforms +=1;
}

function translateWord() {
    if (translationToggle == 0) { //**** ENGLISH ***//
        platform.textContent = platformTextNative; 
        platform.setAttributeNS(null,"fill","#FFFFFF"); //FILLCOLOR
    } else { //**** JAPANESE ***//
        platform.textContent = platformTextForeign;
        platform.setAttributeNS(null,"fill","#000000"); //FILLCOLOR 
    }
}

function score()
{
    var svgNS = "http://www.w3.org/2000/svg";   //DEFINE THE namespaceURI
    
        score = document.createElementNS(svgNS,"text"); //CREATE A RTEXT NODE
        score.setAttributeNS(null,"x",w-60); //START X 
        score.setAttributeNS(null,"y",h/2-110);    //START Y
        score.setAttributeNS(null,"fill","white"); //FILLCOLOR
        score.setAttributeNS(null,"font-family","helvetica"); //FONT
        score.setAttributeNS(null,"font-weight","bold"); //FONT-WEIGHT
        score.textContent ="0";  //TEXT
        score.current = 0; //CURRENT SCORE

        
        SVG.appendChild(score) //APPEND LEVEL TO THE SVG ELEMENT
}

function updateScore()
{
        
        score.current += 1; //ADD TO SCORE

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
    
        if(platform.position.x < (w/2)*-1)//BLOCK IS OUT OF SCREEN
        {
            activePlatforms -=1;
            //platform.position.y = (Math.random()*100)*-1; //PUT IT BACK ON TOP
            //platform.velocity.x = Math.random()*4+1; //SET NEW VELOCITY
        }
        
        
        platform.position.x -= platform.velocity.x * dt * 60/1000;//GET THE NEW X POSITION
        platform.position.y -= platform.velocity.y * dt * 60/1000;//GET THE NEW X POSITION
        platform.setAttribute("transform", "translate(" + platform.position.x + " "+ platform.position.y +" )");//TRANSFORM TO THE NEXT X POSITION
    
    
}