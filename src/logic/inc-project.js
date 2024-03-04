let processedProjects = {};

function createProject(title = "Example Project", includedTasks = ["0001", "0002"]) {
    console.log("Create Project", title, includedTasks);
}

function loadProjects() {
    console.log("Create an array of projects based on snapshot data");
}

export { createProject, processedProjects };