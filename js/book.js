var bookMenuItemID = "";
var progressWidth = 1;

function toggleBookMenu(state) //SHOWS OR HIDES THE BOOK MENU ITEMS
{
  let x = document.getElementById("bookDropdown");
  let containsHide = x.className.includes("w3-hide");
  let containsShow = x.className.includes("w3-show");

  //ADD HIDE IF NOT THERE, AND ADD SHOW IF THERE   

  if (state == "ON")
  {
     //ADD SHOW IF NOT THERE, AND REMOVE HIDE IF THERE    
    if (!containsShow) {
      x.className += " w3-show";
    }

    if (containsHide) { 
      x.className = x.className.replace(" w3-hide", "");
    }

  } else if (state == "OFF")
  {
    if (!containsHide) {
      x.className += " w3-hide";
    }
  
    if (containsShow) { 
      x.className = x.className.replace(" w3-show", "");
    }
  }
}

/************BOOK MENU OPTION LISENTER*************/
const bookMenuItems = document.querySelectorAll(".bookMenuItem");

Array.from(bookMenuItems).forEach( bookMenuItem => { //TRIGGERS FOR ALL BOOK MENU OPTIONS CLICKED

  bookMenuItem.addEventListener('click', (e) => {
    bookMenuName = e.target.id;

    var popup = document.getElementById("myPopup");
    popup.textContent = "Book changed to " + bookMenuName;

    document.getElementById("bookLabel").textContent = bookMenuName;
    toggleBookMenu("OFF");
    playPopUp();
  });  
});

//ENSURES WE CAN RE-OPEN THE BOOK MENU
bookMenuButton.addEventListener('click', () => {
  toggleBookMenu("ON");
});  

function playPopUp() //KICKS OFF THE ANIMATION SEQUENCE FOR THE BOOK CHANGE POP UP
{
  var popup = document.getElementById("myPopup");

  if (popup.className.indexOf("show") == -1) //ADD SHOW IF NOT THERE, RE-ADD IF THERE
  { 
    popup.className += " show";
  } else {
    reset_animation();
  }
}

function reset_animation() //STOPS THE BOOK CHANGE POP-UP ANIMATION
{
  var el = document.getElementById("myPopup");
  el.style.animation = 'none';
  el.offsetHeight; /* trigger reflow */
  el.style.animation = null; 
}

