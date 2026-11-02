let nextId = 1;
function addTask(tasks, title) {
    const newTask = {
        id: nextId++,
        title,
        status: "todo",
    };
    return [...tasks, newTask];
}
function completeTask(tasks, id) {
    return tasks.map((task) => task.id === id ? { ...task, status: "done" } : task);
}
function filterByStatus(tasks, status) {
    return tasks.filter((task) => task.status === status);
}
function deleteTask(tasks, id) {
    return tasks.filter((task) => task.id !== id);
}
function advanceTask(tasks, id) {
    return tasks.map((task) => {
        if (task.id !== id)
            return task;
        const nextStatus = task.status === "todo"
            ? "in-progress"
            : task.status === "in-progress"
                ? "done"
                : "done";
        return { ...task, status: nextStatus };
    });
}
function countByStatus(tasks, status) {
    return tasks.filter((task) => task.status === status).length;
}
export { addTask, completeTask, filterByStatus, deleteTask, advanceTask, countByStatus, };
//# sourceMappingURL=model.js.map