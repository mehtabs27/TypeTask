import { advanceTask, deleteTask, addTask, filterByStatus, } from "./model.js";
let tasks = [];
let filter = "all";
// Grab elements — cast so tsc knows exactly what they are.
const titleInput = document.getElementById("title");
const addBtn = document.getElementById("add");
const listEl = document.getElementById("list");
const chipsEl = document.getElementById("chips");
const statusSelect = document.getElementById("status");
const filters = [
    "all",
    "todo",
    "in-progress",
    "done",
];
function visibleTasks() {
    return filter === "all" ? tasks : filterByStatus(tasks, filter);
}
function renderChips() {
    chipsEl.replaceChildren();
    for (const option of filters) {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = option === filter ? "chip active" : "chip";
        chip.dataset.filter = option;
        chip.textContent = option === "all" ? "All" : option.replace("-", " ");
        chip.onclick = () => {
            filter = option;
            render();
        };
        chipsEl.append(chip);
    }
}
function render() {
    renderChips();
    listEl.replaceChildren();
    if (visibleTasks().length === 0) {
        const empty = document.createElement("li");
        empty.className = "empty";
        empty.textContent = "No tasks here yet.";
        listEl.append(empty);
        return;
    }
    for (const task of visibleTasks()) {
        const row = document.createElement("li");
        row.className = "task";
        const title = document.createElement("span");
        title.className = task.status === "done" ? "task-title completed" : "task-title";
        title.textContent = task.title;
        const badge = document.createElement("span");
        badge.className = `badge ${task.status}`;
        badge.textContent = task.status;
        const advance = document.createElement("button");
        advance.type = "button";
        advance.className = "advance";
        advance.textContent = task.status === "done" ? "✓" : "Advance →";
        advance.disabled = task.status === "done";
        advance.onclick = () => {
            tasks = advanceTask(tasks, task.id);
            render();
        };
        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "remove";
        remove.textContent = "✕";
        remove.setAttribute("aria-label", `Delete ${task.title}`);
        remove.onclick = () => {
            tasks = deleteTask(tasks, task.id);
            render();
        };
        row.append(title, badge, advance, remove);
        listEl.append(row);
    }
}
function addCurrentTask() {
    const title = titleInput.value.trim();
    if (!title)
        return;
    tasks = addTask(tasks, title);
    titleInput.value = "";
    titleInput.focus();
    render();
}
addBtn.onclick = () => {
    addCurrentTask();
};
titleInput.onkeydown = (event) => {
    if (event.key === "Enter")
        addCurrentTask();
};
render();
//# sourceMappingURL=app.js.map