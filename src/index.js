"use strict";

import "./style/main.css";

import { snapshot, saveState, importSnapshot, exportSnapshot } from "./logic/inc-storagehandler.js";
import { createTask } from "./logic/inc-task.js";
import { createProject } from "./logic/inc-project.js";
import { renderToMainDisplay, renderToAppConsole } from "./logic/inc-render.js";

const fileSelector = document.getElementById("fileSelector");
const dlgImport = document.getElementById("dlgImport");
const display = document.getElementById("content");
const appConsole = document.getElementById("appConsole");

// Make buttons functional
// Lefthand group
document.getElementById("btSave").addEventListener("click", () => {
    renderToAppConsole(saveState());
});
document.getElementById("btLoadFile").addEventListener("click", () => {
    renderToAppConsole(importSnapshot(fileSelector));
    dlgImport.close();
    display.innerText = snapshot;
});
document.getElementById("btImport").addEventListener("click", () => {
    dlgImport.showModal();
});
document.getElementById("btExport").addEventListener("click", () => {
    renderToAppConsole(exportSnapshot());
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
    renderToMainDisplay(display, "Projects");
});
document.getElementById("btShowTasks").addEventListener("click", () => {
    renderToMainDisplay(display, "Tasks");
});
document.getElementById("btShowAbout").addEventListener("click", () => {
    document.getElementById("dlgAbout").showModal();
});

// Initialize application
renderToMainDisplay(display, "Initial State");