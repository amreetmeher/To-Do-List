const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
function addTask() {
  if (inputBox.value === "") {
    alert("You must add some task buddy !");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00D7";
    li.appendChild(span);

    let button = document.createElement("button");
    button.innerText = "Edit";
    li.appendChild(button);
  }
  inputBox.value = "";
  saveData();
}
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName == "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName == "SPAN") {
      e.target.parentElement.remove();
      saveData();
    } else if (e.target.tagName === "BUTTON") {
      editTask(e.target.parentElement);
    } else {
      e.target.innerText = "Error";
    }
  },
  false
);
function editTask(li) {
  let currentText = li.firstChild.textContent;

  // Check if the text is not empty before allowing editing
  if (currentText.trim() === "") {
    alert("Task cannot be empty!");
    return;
  }

  // Create an input field and set its value to the current task content
  let inputField = document.createElement("input");
  inputField.value = currentText;
  li.innerHTML = "";
  li.appendChild(inputField);

  // Create a Save button to save the edited task
  let saveButton = document.createElement("button");
  saveButton.innerText = "Save";
  li.appendChild(saveButton);

  // Add a click event listener to the Save button
  saveButton.addEventListener("click", function () {
    // Check if the edited text is not empty before saving
    let newText = inputField.value.trim();
    if (newText === "") {
      alert("Task cannot be empty!");
      return;
    }

    li.innerHTML = newText;
    let span = document.createElement("span");
    span.innerHTML = "\u00D7";
    li.appendChild(span);

    let editButton = document.createElement("button");
    editButton.innerText = "Edit";
    li.appendChild(editButton);

    saveData();
  });
}
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
