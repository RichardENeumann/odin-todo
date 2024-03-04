"use strict";

import "./style/main.css";

import { saveState, importSnapshot, exportSnapshot } from "./logic/inc-storagehandler.js";
import { createTask } from "./logic/inc-task.js";
import { createProject } from "./logic/inc-project.js";
import { renderToDOM } from "./logic/inc-render.js";
import { loadController, processedTasks, processedProjects } from "./logic/inc-controller.js";

const display = document.getElementById("content");

// Make buttons functional
// Lefthand group
document.getElementById("btSave").addEventListener("click", () => {
    saveState();
});
document.getElementById("btImport").addEventListener("click", () => {
    importSnapshot();
});
document.getElementById("btExport").addEventListener("click", () => {
    exportSnapshot();
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
    renderToDOM("Projects");
});
document.getElementById("btShowTasks").addEventListener("click", () => {
    renderToDOM("Tasks");
});
document.getElementById("btShowAbout").addEventListener("click", () => {
    document.getElementById("dlgAbout").showModal();
});

// Initialize application
loadController();
renderToDOM("Projects");