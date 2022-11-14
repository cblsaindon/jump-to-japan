var pageCount = 0;
var pageCost = 50; //DEFAULT IS 100
var pagesComplete = false;
var pageRate = 1.2; //DEFAULT IS 2
var pageIcon = "\uf0f6"; //FILE
var completeIcon = "\uf14a" //CHECK MARK SQUARE
var remainingBookCount = 3; //TODO: PULL FROM FAUNA

function incrementPage() {

  let pages = document.getElementById("pageLabel");
  let remainingBooks = document.getElementById("remainingBooks");

  if (pageCount < bookLength) {

    pageCost = pageCost*pageRate;
    pageCount += 1;
    if (compactMode) {
      pagesCompact.textContent ="Pages: " + pageCount + " of " + bookLength;  //TEXT
    } else {
      pages.textContent = pages.textContent + " " + pageIcon;
    }
 
    if (pageCount >= bookLength && pagesComplete == false ) {
      pagesComplete = true;
      completeBook();
      popup.textContent = "Book complete! Choose another from the top menu.";
      playPopUp();

      if (compactMode) {
        pagesCompact.textContent ="Book complete!";  //TEXT
      } else {
        pages.textContent = pages.textContent + " " + completeIcon;  
      }

      remainingBookCount -= 1;
      remainingBooks.innerText = remainingBookCount;
    }
  }
  pageFlag = "true";
}

function completeBook() { //DYNAMICALLY COMPLETE BOOK BASED ON SELECTED NAME
  let bookMenuItemEssentials = document.getElementById(bookMenuName);
  bookMenuItemEssentials.classList.add("completeBookMenuItem");
}

function clearPages() { //WIPE PAGE PROGRESS FROM BAR AND PAGECOUNT
  let pages = document.getElementById("pageLabel");

  if (compactMode) {
    pagesCompact.textContent ="";  //TEXT

    barText.textContent = "0%";
    barImage.setAttributeNS(null,"width",1);  //WIDTH

  } else {
    pages.textContent = "";   

    let elem = document.getElementById("myBar");
    elem.style.width = "1%";
    elem.innerHTML = '0%';
  }
  
  pageCost = 100; //DEFAULT IS 100
  pageCount = 0;
  pagesComplete = false;
}

function drawHistory() {
  let history = document.getElementById("historyLabel");
  history.textContent = "History: " + platformTextJapanese + " | " +  platformTextEnglish;
}
