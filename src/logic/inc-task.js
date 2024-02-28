function createTask(title = "Example Task", date = new Date(), done = false) {
    console.log("Create Task: " + title + ", " + date + ", " + done);
}

function loadTasks(tasks) {
    console.log("create task objects based on snapshot data");
    createTask();
}

export { loadTasks };