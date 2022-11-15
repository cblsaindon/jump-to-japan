var platformTextEnglish; //THE ENGLISH VERSION OF THE WORD
var platformTextJapanese; //THE JAPANESE VERSION OF THE WORD
var platform; //THE WORD
var platformSpeed = 3; //THE WORD VELOCITY
var maxPlatforms = 20; //MAX PLATFORMS TO PREPARE
var platformsArray = []; //STORES ALL PLATFORMS IN A ARRAY
var activePlatforms = 0; //PLATFORMS CURRENTLY ON THE SCREEN
var maxActivePlatforms = 1; //MAX PLATFORMS ON THE SCREEN

function translatePlatform() //TOGGLES THE WORD TO JAPANESE OR ENGLISH
{
  if (translationToggle == 0) { //**** ENGLISH ***//
    platform.textContent = platformTextEnglish; 
    platform.setAttributeNS(null,"fill",englishFontColor); //FILLCOLOR
    platform.setAttributeNS(null, "stroke", englishFontColor);

  } else { //**** JAPANESE ***//
    platform.textContent = platformTextJapanese;
    platform.setAttributeNS(null,"fill",japaneseFontColor); //FILLCOLOR 
    platform.setAttributeNS(null, "stroke", japaneseFontColor);
  }
}

function setPlatform() //DRAWS A NEW RANDOMIZED WORD
{
  client.paginate( //API TO GET ALL WORDS ASSOCIATED TO THE CURRENT BOOK
    q.Match(q.Index("words_by_book"), bookMenuName)
  )
  .each(
     function (res) { 
      
      let randomInt = getRandomInt(res.length); 
      let randomIntHeight = getRandomInt(50) + 1;
      let heightVariation = (randomIntHeight+(h/3));

      platform.setAttributeNS(null,"y",heightVariation);    //START Y
 
      platformTextJapanese=res[randomInt][0]; //[0][0] is japanese, [0][1] is english
      platformTextEnglish=res[randomInt][1]; //[0][0] is japanese, [0][1] is english
      
      bookLength = res.length;

      if (translationToggle == 0) { //**** JAPANESE ***//
        platform.textContent = platformTextJapanese; 
        platform.setAttributeNS(null,"fill",japaneseFontColor); //FILLCOLOR
      } else { //**** ENGLISH ***//
        platform.textContent = platformTextEnglish; 
        platform.setAttributeNS(null,"fill",englishFontColor); //FILLCOLOR
      }
      
    }
  )
  .catch(function (err) { console.log('Error:', err) }
  )

  platform.position.y = (h/10); //SET Y POSITION
  platform.position.x = (w/1.5);//SET RANDOM START POSITION X RIGHT; the higher, the more right ex. 800

  activePlatforms +=1;
}

function changePlatformSpeed() //ADJUST WORD SPEED BASED ON THE SETTINGS SLIDER
{    
  platformSpeed = document.getElementById("speedSlider").value;
  platform.velocity = { x: platformSpeed, y: 0 }; //VELOCITY OF THE PLATFORM
}

function changePrimaryPlatformLanguage() //SWITCHES JAPANESE AND ENGLISH BOOLEAN
{
  if (translationToggle == 0) { //**** JAPANESE ***//
    translationToggle = 1;
  } else { //**** ENGLISH ***//
    translationToggle = 0;
  }
}