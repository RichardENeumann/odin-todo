import { snapshot } from "../index.js";
import { findUnusedId } from "./inc-task.js";

export { createProject };

function createProject(title = "Example Project") {
    let newProject = {
        title, 
        "id": findUnusedId("projects"),
        "children": []
    };
    // Check if snapshot is empty before pushing new project
    if ("projects" in snapshot) {
        snapshot.projects.push(newProject);
    } else {
        snapshot.projects = [];
        snapshot.projects.push(newProject);
    }
}