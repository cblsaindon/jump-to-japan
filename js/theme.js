var themeMode = "LIGHT";
var e = document.getElementById("body");

var englishFontColor;
var japaneseFontColor;

var englishFontColorLight = "#FFF5F9";
var japaneseFontColorLight = "#4D222F";

var englishFontColorDark = "#9C86A4";
var japaneseFontColorDark = "#EBB4C1";


function initTheme() {
  setLightMode();
}

function setDarkMode() {
  themeMode = "DARK";
  if (e.className.includes("light-theme")) { //SET TO DARK MODE
    e.className = e.className.replace("light-theme", "dark-theme");  
  }

  SVG.style.backgroundImage = "url(images/gamebg_darkcherryblossom.jpg)";
  japaneseFontColor = japaneseFontColorDark;
  englishFontColor = englishFontColorDark;
}

function setLightMode() {
  themeMode = "LIGHT";
  if (e.className.includes("dark-theme")) { //SET TO DARK MODE
    e.className = e.className.replace("dark-theme", "light-theme");
  }

  SVG.style.backgroundImage = "url(images/gamebg_cherryblossom.jpg)";
  japaneseFontColor = japaneseFontColorLight;
  englishFontColor = englishFontColorLight;
}

function toggleTheme()
{
  if (e.className.includes("light-theme")) { //SET TO DARK MODE
    setDarkMode();  
  } else { //SET TO LIGHT MODE
    setLightMode();
  }
}