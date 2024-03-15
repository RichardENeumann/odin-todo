import { snapshot } from "../index.js";
import { editTask, deleteTask } from "./inc-task.js";
import { editProject, deleteProject } from "./inc-project.js";

export { renderToAppConsole, renderVersionNumber, renderToDisplay };

const display = document.getElementById("display");

function renderToAppConsole(message) {
    document.getElementById("appConsole").innerText = message;
}

function renderVersionNumber(version) {
    let versionDisplay = document.getElementsByClassName("version");
    Array.from(versionDisplay).forEach(el => el.innerText = version);
}

// Show either tasks or projects on screen
function renderToDisplay() {
    switch (snapshot.options.view) {
        case "tasks": {
            display.classList.remove("showProjects");
            display.classList.add("showTasks");
            if ("tasks" in snapshot) {
                display.innerHTML = "";
                renderTasks(snapshot.tasks, display);
            } else {
                display.innerHTML = "No tasks"
            }
            break;
        }
        case "projects": {
            display.classList.remove("showTasks");
            display.classList.add("showProjects");
            if ("projects" in snapshot) {
                display.innerHTML = "";
                renderProjects(snapshot.projects);
            } else {
                display.innerHTML = "No projects";
            }
            break;
        }
        default:
            display.innerHTML = "";
            renderToAppConsole("An error has occured");
            break;
    }
}

// This will render tasks on their own page or inside a project div
function renderTasks(taskList, parent) {
    taskList.forEach(el => {
        const taskNode = document.createElement("div");
            taskNode.classList.add("task");
            taskNode.id = "task" + el.id;
        parent.appendChild(taskNode);   

        const taskTitle = document.createElement("div");
            taskTitle.innerText = el.title;
        taskNode.appendChild(taskTitle);
        
        const btEditTask = document.createElement("button");
            btEditTask.id = "editTask" + el.id;
            btEditTask.innerText = "✏️";
            btEditTask.addEventListener("click", (e) => {
                showEditTaskDialog(e.target.id.match(/\d+$/)[0]);
            });
        taskTitle.appendChild(btEditTask);

        const btDeleteTask = document.createElement("button");
            btDeleteTask.id = "delTask" + el.id;
            btDeleteTask.innerText = "🗑️"
            btDeleteTask.addEventListener("click", (e) => {
                showDeleteTaskDialog(e.target.id.match(/\d+$/)[0]);
            })
        taskTitle.appendChild(btDeleteTask);

        const taskState = document.createElement("div");
        taskState.innerText = (el.done) ? 
            new Date(el.todo).toLocaleDateString() + " 🟢" : 
                (el.doing) ? 
                new Date(el.doing).toLocaleDateString() + " 🟡" :
                    new Date(el.todo).toLocaleDateString() + " 🔴";
        taskNode.appendChild(taskState);
    });
}

function renderProjects(projectList) {
    projectList.forEach(el => {
        const projectNode = document.createElement("div");
            projectNode.classList.add("project");
        display.appendChild(projectNode);

        const titleNode = document.createElement("div");
            titleNode.innerText = el.title;
        projectNode.appendChild(titleNode);

        const btEditProject = document.createElement("button");
            btEditProject.id = "EditProject" + el.id;
            btEditProject.innerText = "✏️"
            btEditProject.addEventListener("click", e => {
                showEditProjectDialog(e.target.id.match(/\d+$/)[0]);
            });
        titleNode.appendChild(btEditProject);

        const btDeleteProject = document.createElement("button");
            btDeleteProject.id = "DeleteProject" + el.id;
            btDeleteProject.innerText = "🗑️"
            btDeleteProject.addEventListener("click", e => {
                showDeleteProjectDialog(e.target.id.match(/\d+$/)[0]);
            });
        titleNode.appendChild(btDeleteProject);
        
        // Find tasks associated with project and render them
        const projectChildren = snapshot.tasks.filter(el2 =>
            el.children.includes(el2.id));
        renderTasks(projectChildren, projectNode);
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
    const taskIndex = snapshot.tasks.findIndex(el => el.id == taskId);

    // Pass taskId to DOM for updateTask()
    datEditTaskId.value = taskId;
    
    // Populate dialog with task content
    inpEditTaskName.value = snapshot.tasks[taskIndex].title;

    inpEditTaskTodoDate.valueAsDate = new Date(snapshot.tasks[taskIndex].todo);

    inpEditTaskDoingDate.valueAsDate = (snapshot.tasks[taskIndex].doing) ? 
        new Date(snapshot.tasks[taskIndex].doing) : null;
    
    inpEditTaskDoneDate.valueAsDate = (snapshot.tasks[taskIndex].done) ? 
        new Date(snapshot.tasks[taskIndex].done) : null;
    
    dlgEditTask.showModal();
}

function confirmEditTask() {
    editTask(
        datEditTaskId.value, 
        inpEditTaskName.value,
        inpEditTaskTodoDate.value,
        inpEditTaskDoingDate.value,
        inpEditTaskDoneDate.value
    );
    datEditTaskId.value = "";

    renderToDisplay();
    dlgEditTask.close();
}

// Handle deleting of tasks
const dlgDelTask = document.getElementById("dlgDelTask");
const datDelTaskId = document.getElementById("datDelTaskId")
const btConfirmDelTask = document.getElementById("btConfirmDelTask");
    btConfirmDelTask.onclick = confirmDelTask;

function showDeleteTaskDialog(id) {
    datDelTaskId.value = id;
    dlgDelTask.showModal();
}

function confirmDelTask() {
    deleteTask(datDelTaskId.value);
    datDelTaskId.value = "";

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
    const taskIndex = snapshot.projects.findIndex(el => el.id == taskId);

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
    parent.innerHTML = "";
    taskList.forEach(el => {
        const task = document.createElement("option");
        task.value = el.id;
        task.innerText = el.title;
        parent.appendChild(task);
    });
}

function AddToProject() {
    Array.from(selAddProjectChildren.selectedOptions).forEach(el =>
        selEditProjectChildren.appendChild(el));
    Array.from(selEditProjectChildren.selectedOptions).forEach(el =>
        el.selected = false);
}

function RemoveFromProject() {
    Array.from(selEditProjectChildren.selectedOptions).forEach(el =>
        selAddProjectChildren.appendChild(el));
    Array.from(selAddProjectChildren.selectedOptions).forEach(el => 
        el.selected = false);
}

function confirmEditProject() {
    const children = [];
    Array.from(selEditProjectChildren.options).forEach(el => children.push(+el.value));
    
    editProject(
        datEditProjectId.value,
        inpEditProjectName.value,
        children
    );
    datEditProjectId.value = "";

    renderToDisplay("projects");
    dlgEditProject.close();
}

// Handle deleting of projects
const dlgDelProject = document.getElementById("dlgDelProject");
const datDelProjectId = document.getElementById("datDelProjectId")
const btConfirmDelProject = document.getElementById("btConfirmDelProject");
    btConfirmDelProject.onclick = confirmDelProject;

function showDeleteProjectDialog(id) {
    datDelProjectId.value = id;
    dlgDelProject.showModal();
}

function confirmDelProject() {
    deleteProject(datDelProjectId.value);
    datDelProjectId.value = "";

    renderToDisplay("projects");
    dlgDelProject.close();
}