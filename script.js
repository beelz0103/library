let myLibrary = [];
let book_id = 0;

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.identifier = null;
  }
}

document.querySelector("#addbook").addEventListener("click", showForm);
document.querySelector("#book_closebutton").addEventListener("click", hideForm);
document
  .querySelector("#book_createbook")
  .addEventListener("click", createBook);

function showForm() {
  document.querySelector(".modal-form").classList.add("show-modal");
}

function hideForm() {
  document.querySelector(".modal-form").classList.remove("show-modal");
}

function currentBook() {
  return myLibrary.at(-1);
}

function createBook() {
  const booktitle = document.querySelector("#book_title");
  const bookauthor = document.querySelector("#book_author");
  const bookpages = document.querySelector("#book_pages");
  const bookread = document.querySelector("#book_read");
  if (checkvalidity(booktitle, bookauthor, bookpages)) {
    myLibrary.push(
      new Book(
        booktitle.value,
        bookauthor.value,
        bookpages.value,
        bookread.checked
      )
    );
    currentBook().identifier = book_id.toString();
    book_id += 1;
    buildCard(currentBook());
    hideForm();
    document.querySelector("form").reset();
  }
}

function checkvalidity(title, author, read) {
  if (title.value == "") title.reportValidity();
  else if (author.value == "") author.reportValidity();
  else if (read.value == "") read.reportValidity();
  else return true;
}

function buildCard(value) {
  const card_container = document.querySelector("div#cardcontainer");
  const card_div = document.createElement("div");
  card_div.id = value.identifier;

  const title_div = document.createElement("div");
  title_div.textContent = `Title: ${value.title}`;
  card_div.appendChild(title_div);

  const auth_div = document.createElement("div");
  auth_div.textContent = `Author: ${value.author}`;
  card_div.appendChild(auth_div);

  const page_div = document.createElement("div");
  page_div.textContent = `Pages: ${value.pages}`;
  card_div.appendChild(page_div);

  const read_btn = document.createElement("button");

  if (value.read) {
    read_btn.textContent = "Read";
    read_btn.style.backgroundColor = "green";
  } else {
    read_btn.textContent = "Not Read";
    read_btn.style.backgroundColor = "red";
  }

  read_btn.addEventListener("click", changeReadStatus);
  card_div.appendChild(read_btn);

  const delete_btn = document.createElement("button");
  delete_btn.textContent = "Delete";
  delete_btn.addEventListener("click", deleteBook);
  card_div.appendChild(delete_btn);

  card_container.appendChild(card_div);
}

function deleteBook(e) {
  myLibrary = myLibrary.filter(
    (book) => book.identifier != e.target.parentNode.id
  );
  e.target.parentNode.remove();
}

function changeReadStatus(e) {
  let book = myLibrary.find(
    (element) => element.identifier === e.target.parentNode.id
  );
  if (book.read) {
    book.read = false;
    e.target.textContent = "Not Read";
    e.target.style.backgroundColor = "red";
  } else {
    book.read = true;
    e.target.textContent = "Read";
    e.target.style.backgroundColor = "green";
  }
}

function saveLibrary() {
  localStorage.clear();
  localStorage.setItem(`libr`, JSON.stringify(myLibrary));
}

function loadLibrary() {
  newLib = JSON.parse(localStorage.getItem(`libr`));
  if (newLib == null) {
    return;
  } else {
    if (newLib.length != 0) {
      book_id = parseInt(newLib.at(-1).identifier) + 1;
    }

    newLib.forEach((bookObj) => {
      myLibrary.push(
        new Book(bookObj.title, bookObj.author, bookObj.pages, bookObj.read)
      );
      currentBook().identifier = bookObj.identifier;
      buildCard(currentBook());
    });
  }
}

window.addEventListener("beforeunload", () => {
  saveLibrary();
  return null;
});

loadLibrary();
