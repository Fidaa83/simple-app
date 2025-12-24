const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");

// tasks: array of objects: { text: "...", done: true/false }
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement("li");

    // left side (checkbox + text)
    const left = document.createElement("div");
    left.className = "task-left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tasks[i].done;

    const textSpan = document.createElement("span");
    textSpan.className = "task-text";
    textSpan.textContent = tasks[i].text;

    // لو المهمة منجزة: شطب
    if (tasks[i].done) {
      textSpan.classList.add("done");
    }

    checkbox.addEventListener("change", function () {
      tasks[i].done = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    left.appendChild(checkbox);
    left.appendChild(textSpan);

    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", function () {
      tasks.splice(i, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(left);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  }
}

button.addEventListener("click", function () {
  const text = input.value.trim();
  if (text === "") return;

  tasks.push({ text: text, done: false });
  saveTasks();
  renderTasks();
  input.value = "";
});

renderTasks();
