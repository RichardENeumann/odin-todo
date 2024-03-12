import { snapshot } from "../index.js";
import { updateTask, deleteTask } from "./inc-task.js";

export { renderToAppConsole, renderVersionNumber, renderToDisplay };

const display = document.getElementById("display");

function renderToAppConsole(message) {
    document.getElementById("appConsole").innerText = message;
}

function renderVersionNumber(version) {
    let versionDisplay = document.getElementsByClassName("version");
    Array.from(versionDisplay).forEach(element => element.innerText = version);
}

// Show either tasks or projects on screen
function renderToDisplay(mode = "tasks") {
    switch (mode) {
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
    taskList.forEach(element => {
        const taskNode = document.createElement("div");
            taskNode.classList.add("task");
            taskNode.id = "task" + element.id;
        parent.appendChild(taskNode);   

        const taskTitle = document.createElement("div");
            taskTitle.innerText = element.title;
        taskNode.appendChild(taskTitle);
        
        const btEditTask = document.createElement("button");
            btEditTask.id = "editTask" + element.id;
            btEditTask.innerText = "✏️";
            btEditTask.addEventListener("click", (e) => {
                showEditTaskDialog(e.target.id.match(/\d+$/)[0]);
            });
        taskTitle.appendChild(btEditTask);

        const btDeleteTask = document.createElement("button");
            btDeleteTask.id = "delTask" + element.id;
            btDeleteTask.innerText = "🗑️"
            btDeleteTask.addEventListener("click", (e) => {
                showDeleteTaskDialog(e.target.id.match(/\d+$/)[0]);
            })
        taskTitle.appendChild(btDeleteTask);
        
        const taskTodo = document.createElement("div");
        taskTodo.innerText = (element.todo) ? 
            new Date(element.todo).toLocaleDateString() : "-";
        taskNode.appendChild(taskTodo);

        const taskDoing = document.createElement("div");
        taskDoing.innerText = (element.doing) ? 
            new Date(element.doing).toLocaleDateString() : "-";
        taskNode.appendChild(taskDoing);

        const taskDone = document.createElement("div");
        taskDone.innerText = (element.done) ? 
            new Date(element.done).toLocaleDateString() : "-";
        taskNode.appendChild(taskDone);
    });
}

function renderProjects(projectList) {
    projectList.forEach(element => {
        const projectNode = document.createElement("div");
            projectNode.innerText = element.title;
            projectNode.classList.add("project");
        display.appendChild(projectNode);
        
        // Find tasks associated with project and render them
        const projectChildren = [];
        element.children.forEach(child => {
             projectChildren.push(snapshot.tasks.find(element => element.id == child));
        })
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
    const taskIndex = snapshot.tasks.findIndex(a => a.id == taskId);

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
    updateTask(
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