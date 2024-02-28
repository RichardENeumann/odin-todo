function createTask(title = "Example Task", todo = new Date(), doing = false, done = false) {
    console.log("Create Task", title, todo, doing, done);
}

function loadTasks(snapshotTasks) {
    console.log("create task objects based on snapshot data");
    createTask();
}

export { loadTasks };