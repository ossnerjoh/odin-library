const addBookForm = document.getElementById("addBookForm");
const addBookFormModal = document.getElementById("addBookFormModal");
const inp_title = document.getElementById("title");
const inp_author = document.getElementById("author");
const inp_noOfPages = document.getElementById("noOfPages");
const cb_read = document.getElementById("read");

const bookContainer = document.getElementById("bookContainer");

let myLibrary = [
  new Book("Der kleine Prinz", "St. Exupery", 194, false),
  new Book("Harry Potter", "J.K. Rowling", 350, false),
  new Book("Biedermann und die ...", "Max Frisch", 180, true),
  new Book("Homo Faber", "Max Frisch", 180, true),
];

addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  console.log(myLibrary);
  displayBooks();
});

const deleteBook = function (event) {
  // get Index from data-* Attribute bookId
  // has been saved in Element on Rendering
  bookId = event.target.getAttribute("data-bookId");
  myLibrary.splice(bookId, 1);
  displayBooks();
};

const toggleReadStatus = (event) => {
  console.log(myLibrary[event.target.getAttribute("data-bookId")]);
  myLibrary[event.target.getAttribute("data-bookId")].toggleRead();
  displayBooks(); 
}

const displayBooks = () => {
  bookContainer.replaceChildren();
  myLibrary.forEach((book, index) => {
    const bookCol = document.createElement("div");
    bookCol.className = "single-book-col col col-sm-6 col-md-4 col-lg-3 ";

    bookCard = document.createElement("div");
    bookCard.className = "card bg-light h-100 d-flex";

    bookCardBody = document.createElement("div");
    bookCardBody.className = "card-body";

    bookCardBodyTitle = document.createElement("h5");
    bookCardBodyTitle.className = "card-title";
    bookCardBodyTitle.textContent = `${book.title}`;

    bookCardBodyText = document.createElement("p");
    bookCardBodyText.innerHTML = `
      ${book.author} <br>
      ${book.noOfPages}<br>
      ${book.read ? "gelesen" : "ungelesen"}`;
    bookCardDeleteButton = document.createElement("button");
    bookCardDeleteButton.className = "btn btn-danger d-block w-100";
    bookCardDeleteButton.textContent = "delete";
    bookCardDeleteButton.setAttribute("data-bookId", index); //ENTER index Here
    bookCardDeleteButton.addEventListener("click", deleteBook);

    bookCardToggleReadButton = document.createElement("button");
    bookCardToggleReadButton.className = `btn ${book.read?'btn-success':'btn-warning'} d-block w-100`;
    bookCardToggleReadButton.textContent = `${book.read?'gelesen':'nicht gelesen'}`;
    bookCardToggleReadButton.setAttribute("data-bookId", index); //ENTER index Here
    bookCardToggleReadButton.addEventListener("click", toggleReadStatus);

    // Todo: author, #pages, read

    bookCardBody.appendChild(bookCardBodyTitle);
    bookCardBody.appendChild(bookCardBodyText);
    bookCardBody.appendChild(bookCardToggleReadButton);
    bookCardBody.appendChild(bookCardDeleteButton);
    bookCard.appendChild(bookCardBody);
    bookCol.appendChild(bookCard);

    bookContainer.appendChild(bookCol);
  });
  saveToLocaleStorage();
};

function Book(title, author, noOfPages, read) {
  this.title = title;
  this.author = author;
  this.noOfPages = noOfPages;
  this.read = read;
}
Book.prototype.toggleRead= function() {

  console.log(this.read);
  this.read= !this.read
};

function addBookToLibrary() {
  const title = inp_title.value;
  const author = inp_author.value;
  const noOfPages = inp_noOfPages.value;
  const read = cb_read.value;

  if (title && author && noOfPages) {
    const book = new Book(title, author, noOfPages, read);
    myLibrary.push(book);
  } else {
    alert("Keine vollständigen Informationen angegeben.");
  }
}

// function saveToLocaleStorage(){
//   myLibraryJSON = JSON.stringify(myLibrary);
//   localStorage.setItem('myLibrary', myLibraryJSON);

// }

// document.addEventListener('load', ()=>{
//   myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
//   displayBooks();
// })
displayBooks();
