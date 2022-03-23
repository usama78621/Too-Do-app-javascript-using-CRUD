// Selects all From HTML
const from = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.querySelector("#grocery");
const subBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const editBtn = document.querySelector(".edit-btn");

const clearBtn = document.querySelector(".clear-btn");

let editElement;
let editFlag = false;
let editID = "";
// EventListener

from.addEventListener("submit", addItem);

clearBtn.addEventListener("click", clearItem);
window.addEventListener("DOMContentLoaded", setupItems);


function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toLocaleString();
  //  console.log(value);
  //  console.log(id);
  if (value !== "" && !editFlag) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
    const deleteBtn = element.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", deleteItem);

    const editBtn = element.querySelector(".edit-btn");

    editBtn.addEventListener("click", editItem);
    list.appendChild(element);

    container.classList.add("show-container");

    displayalert("Item Success to add", "success");
    setBydefult();
    addToLocalStorage(id,value)
  } else if (value !== "" && editFlag == true) {
    editElement.innerHTML = value;
    displayalert("value changed", "success");
    editLocalStorage(editID, value);

  setBydefult()

  } else {
    displayalert("Please enter valied value", "danger");
  }
}

// deleteItem one by one

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;

  list.removeChild(element);

  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayalert("item removed", "danger");

  setBydefult();
  // remove from local storage
  removeFromLocalStorage(id);
}

// editElement for forEach

function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  //  console.log(element)
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  //
  subBtn.textContent = "edit";
}

// clearItem All
function clearItem() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayalert("empty list", "danger");
  setBydefult();
  localStorage.removeItem("list");
}

// display as Function

function displayalert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

function setBydefult() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  subBtn.textContent = "submit";
}
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();

  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

// SETUP LOCALSTORAGE.REMOVEITEM('LIST');

// ****** setup items **********

function setupItems() {
  let items = getLocalStorage();

  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });

  localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();

  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

// SETUP LOCALSTORAGE.REMOVEITEM('LIST');

// ****** setup items **********

function setupItems() {
  let items = getLocalStorage();

  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}
function createListItem(id, value) {
  const element = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("grocery-item");
  element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
  // add event listeners to both buttons;
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);

  // append child
  list.appendChild(element);
}