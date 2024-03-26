import { findUnusedId } from "./inc-task.js";

export function createProject(currentSnapshot, title) {
  const newProject = {
    title,
    id: findUnusedId(currentSnapshot, "projects"),
    children: [],
  };
  currentSnapshot.projects.push(newProject);
}

export function editProject(currentSnapshot, id, title, children) {
  const currentSnapshotHelper = currentSnapshot;
  const projectIndex = currentSnapshot.projects.findIndex(el => el.id === +id);
  currentSnapshotHelper.projects[projectIndex].title = (title || "Example Project");
  currentSnapshotHelper.projects[projectIndex].children = (children || []);
}

export function deleteProject(currentSnapshot, id) {
  const projectIndex = currentSnapshot.projects.findIndex(el => el.id === +id);
  currentSnapshot.projects.splice(projectIndex, 1);
}
