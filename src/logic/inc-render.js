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
        taskNode.innerText = element.title;
        taskNode.classList.add("task");
        
        let taskTodo = document.createElement("div");
        taskTodo.innerText = element.todo;
        taskNode.appendChild(taskTodo);

        let taskDoing = document.createElement("div");
        taskDoing.innerText = element.doing;
        taskNode.appendChild(taskDoing);

        let taskDone = document.createElement("div");
        taskDone.innerText = element.done;
        taskNode.appendChild(taskDone);

        parent.appendChild(taskNode);   
    });
}
function renderToDisplay(content, mode = "tasks") {
    switch (mode) {
        case "tasks": {
            if ("tasks" in content) {
                display.innerHTML = "";
                renderTasks(content.tasks, display);
            } else {
                display.innerText = "No tasks"
            }
            break;
        }
        case "projects": {
            if ("projects" in content) {
                display.innerHTML = "";
                content.projects.forEach(element => {
                    let projectNode = document.createElement("div");
                    projectNode.innerText = element.title;
                    projectNode.classList.add("project");

                    renderTasks(content.tasks, projectNode);

                    display.appendChild(projectNode);
                });
            } else {
                display.innerText = "No Projects";
            }
            break;
        }
        default:
            display.innerText = "An error has occured.";
    }
}

