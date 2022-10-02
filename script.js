let myLibrary = [];
const create_book = document.querySelector("#createbook");
const add_book = document.querySelector("#addbook");
const fc_style = document.querySelector("#formcontainer").style;
const cardcontainer = document.querySelector(".cardcontainer")
let count = 0

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.identifier = null
}

add_book.addEventListener("click", () => {
    fc_style.display = "flex"
})

create_book.addEventListener("click", createBook)

function createBook() {    
    const title = document.querySelector("#title").value
    const author = document.querySelector("#author").value
    const pages = document.querySelector("#pages").value
    const read = document.querySelector("#read").checked
    fc_style.display = "none";    
    myLibrary.push(new Book(title, author, pages, read))       
    myLibrary.at(-1).identifier = count.toString()
    count = count + 1 
    createcard(myLibrary.at(-1))
    updatecard(myLibrary.at(-1))
    delete_book(myLibrary.at(-1))
    read_book(myLibrary.at(-1))
    document.querySelector("form").reset()
}

function createcard(value) {
    const div = document.createElement("div");
    div.classList.add("card");   
    div.id = value.identifier
    cardcontainer.appendChild(div)

}

function updatecard(value) {
    const card = document.querySelector(".cardcontainer").lastChild;
    for (const key in value) {
        if (key != 'identifier') {
        const div = document.createElement("div"); 
        if (key == 'read') {
            if (value[key]) {
                div.textContent = `${key}: You have read the book`
            }
            else {
                div.textContent = `${key}: You have not read the book`
            }
        }
        else {
            div.textContent = `${key}: ${value[key]}`
        }

        card.appendChild(div)  
        }
    }

    read_button = document.createElement("button")
    read_button.textContent = "Change read status"
    read_button.classList.add("read_button")    
    delete_btn = document.createElement("button")
    delete_btn.textContent = "Delete"
    delete_btn.classList.add("delete_btn")
    card.appendChild(delete_btn)  
    card.appendChild(read_button)  

}



function delete_book(value) {
    let id = value.identifier    
    document.getElementById(`${id}`).querySelector(".delete_btn").addEventListener("click", (e)=> {
        e.target.parentNode.remove();
        myLibrary = myLibrary.filter((val)=>{     
            return val.identifier != id
        })
    })

}

function read_book(value) {
    let id = value.identifier    
    document.getElementById(`${id}`).querySelector(".read_button").addEventListener("click", (e)=> {
        const read_txt = e.target.parentNode.querySelector("div:nth-child(4)")
        if (value.read) {
            value.read = !value.read
            read_txt.textContent = `Read: You have not read the book`
        }
        else {
            value.read = !value.read
            read_txt.textContent = `Read: You have read the book` 
        }
    })

}

function saveLibraryToLocalStorage(){
    localStorage.clear();
    localStorage.setItem(`lib`, JSON.stringify(myLibrary));
}

function readFormLocalStorage(){
    newLib = JSON.parse(localStorage.getItem(`lib`));
    console.log(newLib)
    if (newLib == null) {
        return
    }
    else {
        console.log(newLib)
        if (newLib.length == 0) {
            console.log("booboo")
        }
        else{
            count = parseInt(newLib.at(-1).identifier) + 1
            console.log(count)   
            console.log(typeof(count))    
        }

        console.log(newLib)
        newLib.forEach((bookObj) => {
            console.log(bookObj)
            myLibrary.push(new Book(bookObj.title, bookObj.author, bookObj.pages, bookObj.read));
            myLibrary.at(-1).identifier = bookObj.identifier
            createcard(bookObj)
            updatecard(bookObj)
            delete_book(bookObj)
            read_book(bookObj)
        })
    }
}

readFormLocalStorage();

window.onbeforeunload = closingCode;
function closingCode(){
    saveLibraryToLocalStorage()
    return null;
}




