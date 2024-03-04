export { createProject };

function createProject(title = "Example Project", includedTasks = ["0001", "0002"]) {
    console.log("Create Project", title, includedTasks);
}