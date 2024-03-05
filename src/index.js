"use strict";

import "./style/main.css";

import { loadOnStartup, saveState, importSnapshot, exportSnapshot } from "./logic/inc-storagehandler.js";
import { createTask } from "./logic/inc-task.js";
import { createProject } from "./logic/inc-project.js";
import { renderToAppConsole, renderToDisplay,  } from "./logic/inc-render.js";

const fileSelector = document.getElementById("fileSelector");
const dlgImport = document.getElementById("dlgImport");

// Make buttons functional
// Lefthand group
document.getElementById("btSave").addEventListener("click", () => {
    if (saveState(snapshot)) {
        renderToAppConsole("Saved to localStorage");
    } else {
        renderToAppConsole("Nothing to save");
    }
    
});
document.getElementById("btLoadFile").addEventListener("click", () => {
    let result = importSnapshot(fileSelector);
    if (result) {
        snapshot = result;
        renderToAppConsole("Imported successfully");
        renderToDisplay(snapshot);
    } else {
        renderToAppConsole(result + "Import failed");
    }
    dlgImport.close();
});
document.getElementById("btImport").addEventListener("click", () => {
    dlgImport.showModal();
});
document.getElementById("btExport").addEventListener("click", () => {
    if (exportSnapshot(snapshot)) {
        renderToAppConsole("Exported to JSON file");
    } else {
        renderToAppConsole("Nothing to export");
    }
});

// Middle group
document.getElementById("btAddTask").addEventListener("click", () => {
    createTask();
});
document.getElementById("btAddProject").addEventListener("click", () => {
    createProject();
});

// Righthand group
document.getElementById("btShowProjects").addEventListener("click", () => {
    renderToDisplay(snapshot);
});
document.getElementById("btShowTasks").addEventListener("click", () => {
    renderToDisplay(snapshot);
});
document.getElementById("btShowAbout").addEventListener("click", () => {
    document.getElementById("dlgAbout").showModal();
});

// Initialize
let snapshot = loadOnStartup();
renderToAppConsole("Initializing");
renderToDisplay(snapshot);

