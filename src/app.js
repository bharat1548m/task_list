// Variable Declarations
const input = document.querySelector("#input-task");
const addTask = document.querySelector("#add-btn");
const filterTask = document.querySelector("#filter-task");
const clearTask = document.querySelector("#clear-btn");
const form = document.querySelector("#task-form");
const card = document.querySelector(".card-body");
const list = document.querySelector("ul");

loadEventListeners();

// Load Event Listeners
function loadEventListeners() {
  form.addEventListener("submit", addTaskToList);
  list.addEventListener("click", deleteTaskFromList);
  clearTask.addEventListener("click", clearAllTasks);
  filterTask.addEventListener("keyup", filterTasksFromList);
}

// Event Handlers
function addTaskToList(e) {
  e.preventDefault();
  if(input.value.trim() !== "") {
    const html = `<li class="list-group-item">
                    <div class="row align-items-center">
                      <div class="col-md-9">
                        <p class="card-text">${input.value}</p>
                      </div>
                      <div class="col-md-3">
                        <a href="#" id="delete-item" class="btn btn-sm btn-dark">Delete</a>
                      </div>
                    </div>
                  </li>`;
    // insert HTML
    list.insertAdjacentHTML("beforeend", html);
    // clear input field
    input.value = "";
  } else {
    showError();
  }
}

function showError() {
  // create error alert
  const errorAlert = `<div class="alert alert-danger">Cannot add Empty Task</div>`;
  // insert error alert in DOM
  card.insertAdjacentHTML("afterbegin", errorAlert);
  // disable add button to avoid multiple alerts on UI
  addTask.disabled = true;
  setTimeout(function() {
    // remove alert from UI
    document.querySelector(".alert-danger").remove();
    // enable add button again
    addTask.disabled = false;
  }, 2000);
}

function deleteTaskFromList(e) {
  if(e.target.id === "delete-item") {
    // traverse through DOM to get the list item to delete
    e.target.parentNode.parentNode.parentNode.remove();
  }
}

function clearAllTasks() {
  while(list.firstChild) {
    list.firstChild.remove();
  }
}

function filterTasksFromList(e) {
  const target = e.target.value.toLowerCase();
  // generate HTMLCollection
  const items = list.children;
  for(let item of items) {
    // traverse through item to get the textContent
    if(item.firstElementChild.firstElementChild.firstElementChild.textContent.toLowerCase().includes(target)) {
      item.style.display = "block";
    } else { 
      item.style.display = "none";
    }
  }
}