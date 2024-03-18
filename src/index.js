"use strict";

import "./style/main.css";
import "./style/tablet.css";
import "./style/desktop.css";

import { loadOnStartup, saveState, importSnapshot, exportSnapshot } from "./logic/inc-storagehandler.js";
import { createTask } from "./logic/inc-task.js";
import { createProject } from "./logic/inc-project.js";
import { renderToAppConsole, renderVersionNumber, renderToDisplay,  } from "./logic/inc-render.js";

export { snapshot };

// Initialize
const snapshot = loadOnStartup();
renderVersionNumber("v0.2.6");
renderToAppConsole("Status nominal");
renderToDisplay();

// Implement button functionality
// Lefthand group
// Save current state of snapshot object to localStorage
document.getElementById("btSave").addEventListener("click", () => {
    if (saveState(snapshot)) {
        renderToAppConsole("Saved to localStorage");
    } else {
        renderToAppConsole("Nothing to save");
    }
});

// Open file selector dialog
const dlgImport = document.getElementById("dlgImport");
document.getElementById("btImport").addEventListener("click", () => dlgImport.showModal());

// If file is selected, load JSON, update local snapshot object, then re-render
document.getElementById("btConfirmImport").addEventListener("click", () => {
    const fileSelector = document.getElementById("fileSelector");
    if (fileSelector.files.length != 0) { 
        importSnapshot(fileSelector)
        renderToAppConsole("Snapshot imported");
    } else {
        renderToAppConsole("Nothing to import");
    }
    dlgImport.close();
});

// Export snapshot to JSON file and show confirmation dialog on success
document.getElementById("btExport").addEventListener("click", () => {
    if (exportSnapshot(snapshot)) {
        renderToAppConsole("Exported to JSON file");
        document.getElementById("dlgExportSuccess").showModal();
    } else {
        renderToAppConsole("Nothing exported");
    }
});

// Middle group
// Show Add Task dialog
const dlgAddTask = document.getElementById("dlgAddTask");
const inpAddTaskName = document.getElementById("inpAddTaskName");

document.getElementById("btAddTask").addEventListener("click", () => {
    inpAddTaskName.value = "";
    dlgAddTask.showModal();
});

document.getElementById("btConfirmAddTask").addEventListener("click", () => {
    if (inpAddTaskName.value != "") {
        createTask(inpAddTaskName.value);
        renderToAppConsole("Task created successfully");
        renderToDisplay();
    }
    dlgAddTask.close();
});

// Show Add Project dialog
const dlgAddProject = document.getElementById("dlgAddProject");
const inpAddProjectName = document.getElementById("inpAddProjectName");

document.getElementById("btAddProject").addEventListener("click", () => {
    inpAddProjectName.value = "";
    dlgAddProject.showModal();
});

// Show Add Project dialog
document.getElementById("btConfirmAddProject").addEventListener("click", () => {
    if (inpAddProjectName.value != "") {
        createProject(inpAddProjectName.value);
        renderToAppConsole("Project created successfully");
        renderToDisplay();
    }
    dlgAddProject.close();    
});

// Righthand group
document.getElementById("btShowProjects").addEventListener("click", () => {
    snapshot.options.view = "projects";
    renderToDisplay();
});

document.getElementById("btShowTasks").addEventListener("click", () => {
    snapshot.options.view = "tasks";
    renderToDisplay();
});

document.getElementById("btShowAbout").addEventListener("click", () => {
    document.getElementById("dlgAbout").showModal();
});