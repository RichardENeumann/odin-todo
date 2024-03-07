"use strict";

import "./style/main.css";

import { loadOnStartup, saveState, importSnapshot, exportSnapshot } from "./logic/inc-storagehandler.js";
import { createTask } from "./logic/inc-task.js";
import { createProject } from "./logic/inc-project.js";
import { renderToAppConsole, renderVersionNumber, renderToDisplay,  } from "./logic/inc-render.js";

export { snapshot };

// Initialize
let snapshot = loadOnStartup();
renderVersionNumber("v0.1.2");
renderToAppConsole("Status nominal");
renderToDisplay("tasks");

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
document.getElementById("btLoadFile").addEventListener("click", () => {
    const fileSelector = document.getElementById("fileSelector");
    if (fileSelector.files.length != 0) { 
        importSnapshot(fileSelector)
        renderToAppConsole("Snapshot imported");
    } else {
        renderToAppConsole("Nothing to import");
    }
    dlgImport.close();
});

document.getElementById("btExport").addEventListener("click", () => {
    if (exportSnapshot(snapshot)) {
        renderToAppConsole("Exported to JSON file");
    } else {
        renderToAppConsole("Nothing exported");
    }
});

// Middle group
// Show Add Task dialog
const dlgAddTask = document.getElementById("dlgAddTask");
const inpAddTask = document.getElementById("newTaskName");
document.getElementById("btAddTask").addEventListener("click", () => {
    inpAddTask.value = "";
    dlgAddTask.showModal();
});
// Create new task
document.getElementById("btCreateTask").addEventListener("click", () => {
    if (inpAddTask.value != "") {
        createTask(inpAddTask.value);
        renderToAppConsole("Task created successfully");
        renderToDisplay("tasks");
    }
    dlgAddTask.close();
});

// Show Add Project dialog
const dlgAddProject = document.getElementById("dlgAddProject");
const inpAddProject = document.getElementById("newProjectName");
document.getElementById("btAddProject").addEventListener("click", () => {
    inpAddProject.value = "";
    dlgAddProject.showModal();
});
// Create new project
document.getElementById("btCreateProject").addEventListener("click", () => {
    if (inpAddProject.value != "") {
        createProject(inpAddProject.value);
        renderToAppConsole("Project created successfully");
        renderToDisplay("projects");
    }
    dlgAddProject.close();    
})

// Righthand group
document.getElementById("btShowProjects").addEventListener("click", () => {
    renderToDisplay("projects");
});

document.getElementById("btShowTasks").addEventListener("click", () => {
    renderToDisplay("tasks");
});

document.getElementById("btShowAbout").addEventListener("click", () => {
    document.getElementById("dlgAbout").showModal();
});