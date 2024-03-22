import { findUnusedId } from "./inc-task.js";

function createProject(currentSnapshot, title) {
  const newProject = {
    title,
    id: findUnusedId(currentSnapshot, "projects"),
    children: [],
  };
  currentSnapshot.projects.push(newProject);
}

function editProject(currentSnapshot, id, title, children) {
  const projectIndex = currentSnapshot.projects.findIndex(el => el.id === +id);
  currentSnapshot.projects[projectIndex].title = (title || "Example Project");
  currentSnapshot.projects[projectIndex].children = (children || []);
}

function deleteProject(currentSnapshot, id) {
  const projectIndex = currentSnapshot.projects.findIndex(el => el.id === +id);
  currentSnapshot.projects.splice(projectIndex, 1);
}

export {
  createProject,
  editProject,
  deleteProject,
};
