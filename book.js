var bookMenuItemID = "";
var progressWidth = 1;


function hideBookMenu()
{
    var x = document.getElementById("bookDropdown");

    //ADD HIDE IF NOT THERE, AND ADD SHOW IF THERE   
    if (x.className.indexOf("w3-hide") == -1) {
        x.className += " w3-hide";
      }
      
      if (x.className.indexOf("w3-show") != -1) { 
        x.className = x.className.replace(" w3-show", "");
      }


    //changeBook(selectedBook);
  }

  function showBookMenu()
  {
    var x = document.getElementById("bookDropdown");

    //ADD SHOW IF NOT THERE, AND REMOVE HIDE IF THERE    
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    }
    
    if (x.className.indexOf("w3-hide") != -1) { 
      x.className = x.className.replace(" w3-hide", "");
    }
    
  }


function changeBook(selectedBook)
{
   //PUT ALL MATICHING WORDS FROM WORDS ARRAY INTO A SPECIAL ARRAY
    activeBook = selectedBook;
    activeBookWords = words.filter(function(word) {
        return word.bookNumber == selectedBook;
    });

}

/************BOOK MENU OPTION LISENTER*************/
const bookMenuItems = document.querySelectorAll(".bookMenuItem");

Array.from(bookMenuItems).forEach( bookMenuItem => {
  //DO SOMETHING
  bookMenuItem.addEventListener('click', (e) => {

    bookMenuItemID = e.target.id; //FIND ELEMENT ID
    var newBookID = bookMenuItemID.substring(5,6); //EXTRACT NUMBER

    var popup = document.getElementById("myPopup");
    //alert(newBookID);
    //TODO Get the book name from the books[] array
    //var newBookName = books.find();

    const book = books.find(e => e.id == newBookID);

    popup.textContent = "Book changed to " + book.name;

    changeBook(newBookID);
    hideBookMenu();
    playPopUp();
  });  
});

//bookMenuButton
const bookMenuButton = document.querySelector("#bookMenuButton");

  //DO SOMETHING
  bookMenuButton.addEventListener('click', () => {
    showBookMenu();
  });  


  ///////////////////POP UP//////////////////////

var delayInMilliseconds = 3000; //1 second
  // When the user clicks on <div>, open the popup
function playPopUp() {
  var popup = document.getElementById("myPopup");
    //popup.textContent = "My book is cool";
    //ADD SHOW IF NOT THERE, RE-ADD IF THERE   
    if (popup.className.indexOf("show") == -1) {
      popup.className += " show";
    } else {
      //alert(popup.className);
      reset_animation();
    }
    
}

function reset_animation() {
  var el = document.getElementById("myPopup");
  el.style.animation = 'none';
  el.offsetHeight; /* trigger reflow */
  el.style.animation = null; 
}

