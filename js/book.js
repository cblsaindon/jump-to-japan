var bookMenuItemID = "";
var progressWidth = 1;

function toggleBookMenu(state) //SHOWS OR HIDES THE BOOK MENU ITEMS
{
  var x = document.getElementById("bookDropdown");
  var containsHide = x.className.includes("w3-hide");
  var containsShow = x.className.includes("w3-show");

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

function changeBook(bookID) //QUERIES THE WORD TABLE TO RETRIEVE THE WORDS THAT CORRESPOND TO THE ARGUMENT
{
  //PUT ALL MATICHING WORDS FROM WORDS ARRAY INTO A SPECIAL ARRAY
  activeBook = bookID;
  activeBookWords = words.filter(function(word) {
  return word.bookNumber == bookID;
  });
}

/************BOOK MENU OPTION LISENTER*************/
const bookMenuItems = document.querySelectorAll(".bookMenuItem");

Array.from(bookMenuItems).forEach( bookMenuItem => { //TRIGGERS FOR ALL BOOK MENU OPTIONS CLICKED

  bookMenuItem.addEventListener('click', (e) => {
    bookMenuItemID = e.target.id; //FIND ELEMENT ID
    var newBookID = bookMenuItemID.substring(5,6); //EXTRACT NUMBER

    var popup = document.getElementById("myPopup");
    
    
    /*
    Get-book-name
     Here is where we need to find it in the fauanadb instead of the array
    */
    const book = books.find(e => e.id == newBookID);



    popup.textContent = "Book changed to " + book.name;
    document.getElementById("bookLabel").textContent = book.name;

    changeBook(newBookID);
    toggleBookMenu("OFF");
    playPopUp();
  });  
});

//bookMenuButton
const bookMenuButton = document.querySelector("#bookMenuButton");

//DO SOMETHING
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

