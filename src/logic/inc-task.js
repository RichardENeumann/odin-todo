function createTask(title = "Example Task", date = new Date(), done = false) {
    console.log("Create Task: " + title + ", " + date + ", " + done);
}

export { createTask };