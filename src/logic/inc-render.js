import { snapshot } from "./index.js";

import {
  editTask,
  deleteTask,
} from "./inc-task.js";

import {
  editProject,
  deleteProject,
} from "./inc-project.js";

const display = document.getElementById("display");

export function renderToAppConsole(message) {
  document.getElementById("appConsole").innerText = message;
}

export function renderVersionNumber(version) {
  const versionDisplay = document.getElementsByClassName("version");
  Array.from(versionDisplay).forEach(el => {
    const elHelper = el;
    elHelper.innerText = version;
  });
}

// This will render tasks on their own page or inside a project div
function renderTasks(taskList, parent, options) {
  let taskListHelper = taskList;
  // Sort taskList by degree of completeness, working through [todo, doing, done] date fields
  taskListHelper.sort((a, b) => {
    // First compare done dates if present
    if (a.done) {
      if (b.done) {
        const x = new Date(a.done).getTime();
        const y = new Date(b.done).getTime();
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      }
      return -1;
    }
    if (b.done) {
      return 1;
    }
    // Then compare doing dates if present
    if (a.doing) {
      if (b.doing) {
        const x = new Date(a.doing).getTime();
        const y = new Date(b.doing).getTime();
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      }
      return -1;
    }
    if (b.doing) {
      return 1;
    }
    // Finally compare todo dates
    const x = new Date(a.todo).getTime();
    const y = new Date(b.todo).getTime();
    if (x > y) {
      return -1;
    }
    if (x < y) {
      return 1;
    }
    return 0;
  });

  if (options.sortAscending) {
    taskListHelper = taskListHelper.reverse();
  }

  taskListHelper.forEach(el => {
    const taskNode = document.createElement("div");
    taskNode.classList.add("task");
    taskNode.id = `task${el.id}`;
    parent.appendChild(taskNode);

    const taskTitle = document.createElement("div");
    taskTitle.innerText = el.title;
    taskNode.appendChild(taskTitle);

    const btEditTask = document.createElement("button");
    btEditTask.id = `editTask${el.id}`;
    btEditTask.innerText = "✏️";
    btEditTask.addEventListener("click", (e) => {
      showEditTaskDialog(e.target.id.match(/\d+$/)[0]);
    });
    taskTitle.appendChild(btEditTask);

    const btDeleteTask = document.createElement("button");
    btDeleteTask.id = `delTask${el.id}`;
    btDeleteTask.innerText = "🗑️";
    btDeleteTask.addEventListener("click", (e) => {
      showDeleteTaskDialog(e.target.id.match(/\d+$/)[0]);
    });
    taskTitle.appendChild(btDeleteTask);

    const taskState = document.createElement("div");
    if (el.done) {
      taskState.innerText = `${new Date(el.done).toLocaleDateString()} 🟢`;
    } else if (el.doing) {
      taskState.innerText = `${new Date(el.doing).toLocaleDateString()} 🟡`;
    } else {
      taskState.innerText = `${new Date(el.todo).toLocaleDateString()} 🔴`;
    }
    taskNode.appendChild(taskState);
  });
}

// Show either tasks or projects on screen
export function renderToDisplay() {
  switch (snapshot.options.view) {
    case "tasks": {
      display.classList.remove("showProjects");
      display.classList.add("showTasks");
      display.innerHTML = "";

      if (snapshot.tasks.length !== 0) {
        const sortContainer = document.createElement("div");
        sortContainer.id = "btSortTaskView";
        display.appendChild(sortContainer);

        const btSort = document.createElement("button");
        btSort.innerText = "⤵️";
        btSort.addEventListener("click", () => {
          snapshot.options.sortAscending = !snapshot.options.sortAscending;
          renderToDisplay();
        });
        sortContainer.appendChild(btSort);
      }

      renderTasks(snapshot.tasks, display, snapshot.options);
      break;
    }
    case "projects": {
      display.classList.remove("showTasks");
      display.classList.add("showProjects");
      display.innerHTML = "";
      renderProjects(snapshot.projects);
      break;
    }
    default:
      display.innerHTML = "";
      renderToAppConsole("An error has occured");
      break;
  }
}

function renderProjects(projectList) {
  projectList.forEach(el => {
    const projectNode = document.createElement("div");
    projectNode.classList.add("project");
    display.appendChild(projectNode);

    const titleNode = document.createElement("div");
    titleNode.classList.add("titleNode");
    projectNode.appendChild(titleNode);

    const titleDiv = document.createElement("div");
    titleDiv.innerText = el.title;
    titleNode.appendChild(titleDiv);

    const btEditProject = document.createElement("button");
    btEditProject.id = `EditProject${el.id}`;
    btEditProject.innerText = "✏️";
    btEditProject.addEventListener("click", e => {
      showEditProjectDialog(e.target.id.match(/\d+$/)[0]);
    });
    titleDiv.appendChild(btEditProject);

    const btDeleteProject = document.createElement("button");
    btDeleteProject.id = `DeleteProject${el.id}`;
    btDeleteProject.innerText = "🗑️";
    btDeleteProject.addEventListener("click", e => {
      showDeleteProjectDialog(e.target.id.match(/\d+$/)[0]);
    });
    titleDiv.appendChild(btDeleteProject);

    const btSort = document.createElement("button");
    btSort.innerText = "⤵️";
    btSort.addEventListener("click", () => {
      snapshot.options.sortAscending = !snapshot.options.sortAscending;
      renderToDisplay();
    });
    titleNode.appendChild(btSort);

    // Find tasks associated with project and render them
    const projectChildren = snapshot.tasks.filter(el2 => el.children.includes(el2.id));
    renderTasks(projectChildren, projectNode, snapshot.options);
  });
}

// Handle editing of tasks
const dlgEditTask = document.getElementById("dlgEditTask");
const inpEditTaskName = document.getElementById("inpEditTaskName");
const inpEditTaskTodoDate = document.getElementById("inpEditTaskTodoDate");
const inpEditTaskDoingDate = document.getElementById("inpEditTaskDoingDate");
const inpEditTaskDoneDate = document.getElementById("inpEditTaskDoneDate");
const datEditTaskId = document.getElementById("datEditTaskId");
const btConfirmEditTask = document.getElementById("btConfirmEditTask");
btConfirmEditTask.onclick = confirmEditTask;

function showEditTaskDialog(taskId) {
  const taskIndex = snapshot.tasks.findIndex(el => el.id === +taskId);

  // Pass taskId to DOM for updateTask()
  datEditTaskId.value = taskId;

  // Populate dialog with task content
  inpEditTaskName.value = snapshot.tasks[taskIndex].title;

  inpEditTaskTodoDate.valueAsDate = new Date(snapshot.tasks[taskIndex].todo);

  inpEditTaskDoingDate.valueAsDate = (snapshot.tasks[taskIndex].doing)
    ? new Date(snapshot.tasks[taskIndex].doing)
    : null;
  inpEditTaskDoneDate.valueAsDate = (snapshot.tasks[taskIndex].done)
    ? new Date(snapshot.tasks[taskIndex].done) 
    : null;
  dlgEditTask.showModal();
}

function confirmEditTask() {
  editTask(
    snapshot,
    datEditTaskId.value,
    inpEditTaskName.value,
    inpEditTaskTodoDate.value,
    inpEditTaskDoingDate.value,
    inpEditTaskDoneDate.value,
  );
  datEditTaskId.value = "";

  renderToAppConsole("Task edited successfully");
  renderToDisplay();
  dlgEditTask.close();
}

// Handle deleting of tasks
const dlgDelTask = document.getElementById("dlgDelTask");
const datDelTaskId = document.getElementById("datDelTaskId");
const btConfirmDelTask = document.getElementById("btConfirmDelTask");
btConfirmDelTask.onclick = confirmDelTask;

function showDeleteTaskDialog(id) {
  datDelTaskId.value = id;
  dlgDelTask.showModal();
}

function confirmDelTask() {
  deleteTask(snapshot, datDelTaskId.value);
  datDelTaskId.value = "";

  renderToAppConsole("Task deleted successfully");
  renderToDisplay();
  dlgDelTask.close();
}

// Handle editing of projects
const dlgEditProject = document.getElementById("dlgEditProject");
const inpEditProjectName = document.getElementById("inpEditProjectName");
const datEditProjectId = document.getElementById("datEditProjectId");
const selEditProjectChildren = document.getElementById("selEditProjectChildren");
const selAddProjectChildren = document.getElementById("selAddProjectChildren");

const btAddToProject = document.getElementById("btAddToProject");
btAddToProject.onclick = AddToProject;
const btRemoveFromProject = document.getElementById("btRemoveFromProject");
btRemoveFromProject.onclick = RemoveFromProject;
const btConfirmEditProject = document.getElementById("btConfirmEditProject");
btConfirmEditProject.onclick = confirmEditProject;

function showEditProjectDialog(taskId) {
  const taskIndex = snapshot.projects.findIndex(el => el.id === +taskId);

  // Pass project id to DOM for updateProject()
  datEditProjectId.value = taskId;

  // Populate dialog with task content
  inpEditProjectName.value = snapshot.projects[taskIndex].title;

  const candidateList = snapshot.tasks.filter(el =>
    !snapshot.projects[taskIndex].children.includes(el.id));
  renderTasksToListbox(candidateList, selAddProjectChildren);

  const childList = snapshot.tasks.filter(el =>
    snapshot.projects[taskIndex].children.includes(el.id));
  renderTasksToListbox(childList, selEditProjectChildren);

  dlgEditProject.showModal();
}

function renderTasksToListbox(taskList, parent) {
  const parentHelper = parent;
  parentHelper.innerHTML = "";
  taskList.forEach(el => {
    const task = document.createElement("option");
    task.value = el.id;
    task.innerText = el.title;
    parentHelper.appendChild(task);
  });
}

function AddToProject() {
  Array.from(selAddProjectChildren.selectedOptions).forEach(el => {
    selEditProjectChildren.appendChild(el);
  });

  Array.from(selEditProjectChildren.selectedOptions).forEach(el => {
    const elHelper = el;
    elHelper.selected = false;
  });
}

function RemoveFromProject() {
  Array.from(selEditProjectChildren.selectedOptions).forEach(el => {
    selAddProjectChildren.appendChild(el);
  });

  Array.from(selAddProjectChildren.selectedOptions).forEach(el => {
    const elHelper = el;
    elHelper.selected = false;
  });
}

function confirmEditProject() {
  const children = [];
  Array.from(selEditProjectChildren.options).forEach(el => children.push(+el.value));

  editProject(
    snapshot,
    datEditProjectId.value,
    inpEditProjectName.value,
    children,
  );
  datEditProjectId.value = "";

  renderToAppConsole("Project edited successfully");
  renderToDisplay();
  dlgEditProject.close();
}

// Handle deleting of projects
const dlgDelProject = document.getElementById("dlgDelProject");
const datDelProjectId = document.getElementById("datDelProjectId");
const btConfirmDelProject = document.getElementById("btConfirmDelProject");
btConfirmDelProject.onclick = confirmDelProject;

function showDeleteProjectDialog(id) {
  datDelProjectId.value = id;
  dlgDelProject.showModal();
}

function confirmDelProject() {
  deleteProject(snapshot, datDelProjectId.value);
  datDelProjectId.value = "";

  renderToAppConsole("Project deleted successfully");
  renderToDisplay();
  dlgDelProject.close();
}
