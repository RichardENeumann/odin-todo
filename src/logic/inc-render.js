export { renderToAppConsole, renderToDisplay };

function renderToAppConsole(message) {
    document.getElementById("appConsole").innerText = message;
}

function renderToDisplay(content, mode = "tasks") {
    const display = document.getElementById("display");
    switch (mode) {
    case "tasks": {
        if ("tasks" in content) {
            display.innerText = JSON.stringify(content.tasks);
        } else {
            display.innerText = "No tasks"
        }
        break;
    }
    case "projects": {
        if ("projects" in content) {
            display.innerText = JSON.stringify(content.projects);
        } else {
            display.innerText = "No Projects";
        }
        break;
    }
    default:
        display.innerText = "An error has occured.";
    }
}

