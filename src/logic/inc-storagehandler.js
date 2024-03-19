import { snapshot } from "../index.js";

// implement importSnapshot filereader as promise to get rid of this
import { renderToDisplay } from "./inc-render.js";

export { loadOnStartup, saveState, importSnapshot, exportSnapshot };

// Try to load data from localStorage and initialize snapshot
function loadOnStartup() {
    const snapshot = {
        "options": {
            "view": "tasks",
            "sortAscending": true
        },
        "projects": [],
        "tasks": []
    };
    if (localStorage.getItem("localSnapshot")) {
        const helper = JSON.parse(localStorage.getItem("localSnapshot"));
        snapshot.options = helper.options;
        snapshot.projects = helper.projects;
        snapshot.tasks = helper.tasks;
    }
    return snapshot;
}

// Save current state to localStorage
function saveState(snapshot) {
    if (Object.keys(snapshot) != 0) { 
        let processedSnapshot = JSON.stringify(snapshot, null, 2);
        localStorage.clear();
        localStorage.setItem("localSnapshot", processedSnapshot);
        return true;
    }
    else return false;
}

// Load external JSON file as snapshot
function importSnapshot(fileSelector) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        let result = JSON.parse(reader.result);
        snapshot.projects = result.projects;
        snapshot.tasks = result.tasks;
        snapshot.options = result.options;
        // implement as promise in index.js to separate concerns:
        renderToDisplay();
    });
    reader.readAsText(fileSelector.files[0]);
}

// Export current state to JSON file
function exportSnapshot(snapshot) {
    if (Object.keys(snapshot) != 0) { 
        let processedSnapshot = JSON.stringify(snapshot, null, 2);
    
        // Download JSON file 
        let element = document.createElement("a");
            element.setAttribute("href", "data:application/json;charset=utf-8," + encodeURIComponent(processedSnapshot));
            element.setAttribute("download", "tadaSnapshot-" + new Date().toISOString().split('T')[0]);
            element.style.display = "none";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        
        return true;
    } else {
        return false;
    }
}