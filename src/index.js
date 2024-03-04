"use strict";

import "./style/main.css";

import { saveState, importSnapshot, exportSnapshot } from "./logic/inc-storagehandler.js";
import { createTask } from "./logic/inc-task.js";
import { createProject } from "./logic/inc-project.js";
import { renderToAppConsole, renderToDisplay,  } from "./logic/inc-render.js";

const fileSelector = document.getElementById("fileSelector");
const dlgImport = document.getElementById("dlgImport");
const mainDisplay = document.getElementById("content");
const appConsole = document.getElementById("appConsole");

// Feedback to be rendered to app console
let result = "";

// Make buttons functional
// Lefthand group
document.getElementById("btSave").addEventListener("click", () => {
    result = saveState();
    renderToAppConsole(appConsole, result);
});
document.getElementById("btLoadFile").addEventListener("click", () => {
    result = importSnapshot(fileSelector);
    dlgImport.close();
    renderToAppConsole(appConsole, result);
    renderToDisplay(mainDisplay, snapshot);
});
document.getElementById("btImport").addEventListener("click", () => {
    dlgImport.showModal();
});
document.getElementById("btExport").addEventListener("click", () => {
    result = exportSnapshot();
    renderToAppConsole(appConsole, result);
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
    renderToDisplay(mainDisplay, "Projects");
});
document.getElementById("btShowTasks").addEventListener("click", () => {
    renderToDisplay(mainDisplay, "Tasks");
});
document.getElementById("btShowAbout").addEventListener("click", () => {
    document.getElementById("dlgAbout").showModal();
});

// Initialize display
renderToAppConsole(appConsole, "Done loading");
renderToDisplay(mainDisplay, snapshot);

