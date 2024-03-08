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
    }
}

function renderTasks(taskList, parent) {
    taskList.forEach(element => {
        let taskNode = document.createElement("div");

        let taskTitle = document.createElement("div");
        taskTitle.innerText = element.title;
        
            let editButton = document.createElement("button");
            editButton.id = "editTask" + element.id;
            editButton.innerText = "✏️";
            editButton.addEventListener("click", (e) => {
                showEditTaskDialog(e.target);
            });
            taskTitle.appendChild(editButton);

            const btDeleteTask = document.createElement("button");
            btDeleteTask.id = "delTask" + element.id;
            btDeleteTask.innerText = "🗑️"
            btDeleteTask.addEventListener("click", (e) => {
                showDeleteTaskDialog(e.target);
            })
            taskTitle.appendChild(btDeleteTask);
    
        taskNode.appendChild(taskTitle);
        
        let taskTodo = document.createElement("div");
        let todoDate = new Date(element.todo);
        taskTodo.innerText = todoDate.getDate() + "." + 
            (todoDate.getMonth()+1) + "." + todoDate.getFullYear();
        taskNode.appendChild(taskTodo);

        let taskDoing = document.createElement("div");
        if (element.doing) {
            let doingDate = new Date(element.doing);
            taskDoing.innerText = doingDate.getDate() + "." + 
                (doingDate.getMonth()+1) + "." + doingDate.getFullYear();
        } else {
            taskDoing.innerText = "X";
        }
        taskNode.appendChild(taskDoing);

        let taskDone = document.createElement("div");
        if (element.done) {
            let doneDate = new Date(element.done);
            taskDone.innerText = doneDate.getDate() + "." + 
                (doneDate.getMonth()+1) + "." + doneDate.getFullYear();
        } else {
            taskDone.innerText = "X";
        }
        taskNode.appendChild(taskDone);

        taskNode.classList.add("task");
        taskNode.id = "task" + element.id;
        parent.appendChild(taskNode);   
    });
}

function renderProjects(projectList) {
    projectList.forEach(element => {
        let projectNode = document.createElement("div");
        projectNode.innerText = element.title;
        projectNode.classList.add("project");
        
        // Find tasks associated with project and render them
        let projectChildren = [];
        element.children.forEach(child => {
             projectChildren.push(snapshot.tasks.find(element => element.id == child));
        })
        renderTasks(projectChildren, projectNode);
        
        display.appendChild(projectNode);
    });
}

// Handle editing of tasks
const dlgEditTask = document.getElementById("dlgEditTask");
const inpTaskName = document.getElementById("inpTaskName");

function showEditTaskDialog(taskId) {
    const targetId = taskId.id.match(/\d+$/)[0];
    inpTaskName.value = snapshot.tasks.find(a => a.id == targetId).title;
    
    // Put task id into DOM for updateTask()
    const datTask = document.createElement("data");
    datTask.id = "datTask";
    datTask.value = taskId.id.match(/\d+$/)[0];
    dlgEditTask.appendChild(datTask);
 
    const btUpdateTask = document.getElementById("btUpdateTask");
    btUpdateTask.onclick = confirmUpdateTask;

    dlgEditTask.showModal();
}

function confirmUpdateTask() {
    const taskId = document.getElementById("datTask").value;
    dlgEditTask.removeChild(document.getElementById("datTask"));

    const taskTitle = inpTaskName.value;

    updateTask(taskId, taskTitle);
    renderToDisplay();
    dlgEditTask.close();
}

// Handle deleting of tasks
const dlgDelTask = document.getElementById("dlgDelTask");

const btConfirmDelTask = document.getElementById("btConfirmDelTask");
    btConfirmDelTask.onclick = confirmDelTask;

const datDelId = document.getElementById("datDelId")

function showDeleteTaskDialog(target) {
    datDelId.value = target.id.match(/\d+$/)[0];

    dlgDelTask.showModal();
}

function confirmDelTask() {
    deleteTask(datDelId.value);
    datDelId.value = "";

    renderToDisplay();
    dlgDelTask.close();
}