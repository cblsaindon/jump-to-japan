var pageCount = 0;
var pageCost = 10;
var pagesComplete = false;
var pageRate = 1; //DEFAULT IS 2
var pageIcon = "\uf0f6"; //FILE
var completeIcon = "\uf14a" //CHECK MARK SQUARE

function incrementPage() {

  let pages = document.getElementById("pageLabel");
  let bookMenuItemEssentials = document.getElementById("Essentials");
  
  if (pageCount < bookLength) {
    drawHistory();
    pages.textContent = pages.textContent + " " + pageIcon;
    pageCost = pageCost*pageRate;
    pageCount += 1;

    if (pageCount >= bookLength && pagesComplete == false ) {
      pagesComplete = true;
      pages.textContent = pages.textContent + " " + completeIcon;    
      bookMenuItemEssentials.classList.add("completeBookMenuItem");
    }

  }

  pageFlag = "true";

}

function drawHistory() {
  let history = document.getElementById("historyLabel");
  history.textContent = "Last word: " + platformTextJapanese + " | " +  platformTextEnglish;
}
