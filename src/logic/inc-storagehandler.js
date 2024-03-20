import { snapshot } from "./index.js";

// implement importSnapshot filereader as promise to get rid of this
import { renderToDisplay } from "./inc-render.js";

// Try to load data from localStorage and initialize snapshot
function loadOnStartup() {
    const initSnapshot = {
        options: {
            view: "tasks",
            sortAscending: true,
        },
        projects: [],
        tasks: [],
    };
    if (localStorage.getItem("localSnapshot")) {
        const helper = JSON.parse(localStorage.getItem("localSnapshot"));
        initSnapshot.options = helper.options;
        initSnapshot.projects = helper.projects;
        initSnapshot.tasks = helper.tasks;
    }
    return initSnapshot;
}

// Save current state to localStorage
function saveState(currentSnapshot) {
    if (Object.keys(currentSnapshot) !== 0) { 
        const processedSnapshot = JSON.stringify(currentSnapshot, null, 2);
        localStorage.clear();
        localStorage.setItem("localSnapshot", processedSnapshot);
        return true;
    }
    return false;
}

// Load external JSON file as snapshot
function importSnapshot(fileSelector) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        const result = JSON.parse(reader.result);
        snapshot.projects = result.projects;
        snapshot.tasks = result.tasks;
        snapshot.options = result.options;
        // implement as promise in index.js to separate concerns:
        renderToDisplay();
    });
    reader.readAsText(fileSelector.files[0]);
}

// Export current state to JSON file
function exportSnapshot(currentSnapshot) {
    if (Object.keys(currentSnapshot) !== 0) {
        const processedSnapshot = JSON.stringify(snapshot, null, 2);

        // Download JSON file 
        const el = document.createElement("a");
        el.setAttribute("href", `data:application/json;charset=utf-8, ${encodeURIComponent(processedSnapshot)}`);
        el.setAttribute("download", `tadaSnapshot-${new Date().toISOString().split('T')[0]}`);
        el.style.display = "none";
        document.body.appendChild(el);
        el.click();
        document.body.removeChild(el);
        return true;
    }
    return false;
}

export {
    loadOnStartup,
    saveState,
    importSnapshot,
    exportSnapshot,
};
