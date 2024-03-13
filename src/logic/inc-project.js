import { snapshot } from "../index.js";
import { findUnusedId } from "./inc-task.js";

export { createProject, editProject, deleteProject };

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

function editProject(id, title, children) {
    const projectIndex = snapshot.projects.findIndex(el => el.id == id);
    
    snapshot.projects[projectIndex].title = (title) ? title : "Example Project";
    snapshot.projects[projectIndex].children = (children) ? children : [];
}

function deleteProject(id) {
    const projectIndex = snapshot.projects.findIndex(el => el.id == id);

    snapshot.projects.splice(projectIndex, 1);
}