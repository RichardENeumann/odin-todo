function createProject(title = "Example Project", date = new Date(), includedTasks = ["0001", "0002"]) {
    console.log("Create Project: " + title + ", " + date + ", " + includedTasks);
}

function loadProjects() {
    console.log("Create an array of projects based on snapshot data");
    createProject();
}

export { loadProjects };