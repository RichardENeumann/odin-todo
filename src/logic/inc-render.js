import { snapshot } from "../index.js";

export { renderToAppConsole, renderVersionNumber, renderToDisplay };

const display = document.getElementById("display");

function renderToAppConsole(message) {
    document.getElementById("appConsole").innerText = message;
}

function renderVersionNumber(version) {
    let versionDisplay = document.getElementsByClassName("version");
    Array.from(versionDisplay).forEach(element => element.innerText = version);
}

function renderTasks(taskList, parent) {
    taskList.forEach(element => {
        let taskNode = document.createElement("div");

        let taskTitle = document.createElement("div");
        taskTitle.innerText = element.title;
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
        taskNode.id = element.id;
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

