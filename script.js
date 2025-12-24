const input = document.getElementById("taskInput");
const form = document.getElementById("taskForm");
const list = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const clearDoneBtn = document.getElementById("clearDoneBtn");

const STORAGE_KEY = "fidaa_todo_tasks_v1";

let tasks = loadTasks();

renderTasks();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  tasks.unshift({
    id: crypto.randomUUID(),
    text,
    done: false,
    createdAt: Date.now(),
  });

  saveTasks();
  renderTasks();
  input.value = "";
  input.focus();
});

clearDoneBtn.addEventListener("click", () => {
  tasks = tasks.filter((t) => !t.done);
  saveTasks();
  renderTasks();
});

function renderTasks() {
  list.innerHTML = "";

  if (tasks.length === 0) {
    emptyState.style.display = "block";
    clearDoneBtn.disabled = true;
    clearDoneBtn.style.opacity = "0.6";
    return;
  }

  emptyState.style.display = "none";
  clearDoneBtn.disabled = false;
  clearDoneBtn.style.opacity = "1";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.checked = task.done;

    const textSpan = document.createElement("span");
    textSpan.className = "text" + (task.done ? " done" : "");
    textSpan.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-danger";
    deleteBtn.textContent = "Delete";

    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
