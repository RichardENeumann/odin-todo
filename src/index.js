"use strict";

import "./style/main.css";

import { loadOnStartup, saveState, importSnapshot, exportSnapshot } from "./logic/inc-storagehandler.js";
import { createTask } from "./logic/inc-task.js";
import { createProject } from "./logic/inc-project.js";
import { renderToAppConsole, renderVersionNumber, renderToDisplay,  } from "./logic/inc-render.js";

export { snapshot };

// Initialize
let snapshot = loadOnStartup();
renderVersionNumber("v0.0.2");
renderToAppConsole("");
renderToDisplay(snapshot, "tasks");


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
document.getElementById("btImport").addEventListener("click", () => {
    dlgImport.showModal();
});
document.getElementById("btLoadFile").addEventListener("click", () => {
    if (fileSelector.files.length != 0) { 
        if (importSnapshot(fileSelector)) {
            renderToAppConsole("Snapshot imported");
        } else { 
            renderToAppConsole("Import failed");
        }
    } else {
        renderToAppConsole("Nothing to import");
    }
    dlgImport.close();
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
    renderToDisplay(snapshot, "projects");
});
document.getElementById("btShowTasks").addEventListener("click", () => {
    renderToDisplay(snapshot, "tasks");
});
document.getElementById("btShowAbout").addEventListener("click", () => {
    document.getElementById("dlgAbout").showModal();
});


