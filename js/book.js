
//BOOK MENU OPTION LISENTER
const bookMenuItems = document.querySelectorAll(".bookMenuItem");

function toggleBookMenu(state) //SHOWS OR HIDES THE BOOK MENU ITEMS
{
  let x = document.getElementById("bookDropdown");
  let containsHide = x.className.includes("w3-hide");
  let containsShow = x.className.includes("w3-show");

  if (state == "ON") //ADD SHOW IF NOT THERE, AND REMOVE HIDE IF THERE    
  {
    if (!containsShow) {x.className += " w3-show";}
    if (containsHide) {x.className = x.className.replace(" w3-hide", "");}

  } else if (state == "OFF") //ADD HIDE IF NOT THERE, AND REMOVE SHOW IF THERE   
  {
    if (!containsHide) {x.className += " w3-hide";}
    if (containsShow) {x.className = x.className.replace(" w3-show", "");}
  }
}

Array.from(bookMenuItems).forEach( bookMenuItem => { //TRIGGERS FOR ALL BOOK MENU OPTIONS CLICKED

  bookMenuItem.addEventListener('click', (e) => {
    bookMenuName = e.target.id;
    popup.textContent = "Book changed to " + bookMenuName;
    if (compactMode) {
      book.textContent = bookMenuName; //ADD TO SCORE
    } else {
      document.getElementById("bookLabel").textContent = bookMenuName;
    }
    toggleBookMenu("OFF");
    playPopUp();
  });  
});

bookMenuButton.addEventListener('click', () => { //ENSURES WE CAN RE-OPEN THE BOOK MENU
  toggleBookMenu("ON");
});  

function playPopUp() //KICKS OFF THE ANIMATION SEQUENCE FOR THE BOOK CHANGE POP UP
{
  if (popup.className.indexOf("show") == -1) //ADD SHOW IF NOT THERE, RE-ADD IF THERE
  { 
    popup.className += " show";
  } else {
    reset_animation();
  }
}

function reset_animation() //STOPS THE BOOK CHANGE POP-UP ANIMATION
{
  popup.style.animation = 'none';
  popup.offsetHeight; /* trigger reflow */
  popup.style.animation = null; 
}

function updateLevelCount() //TODO: CURRENTLY ALL ADDITONAL DRAWING. WILL NEED TO UPDATE
{
  levelCount += 1;
  document.getElementById("levelLabel").textContent = levelCount;
}