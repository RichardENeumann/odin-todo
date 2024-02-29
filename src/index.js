"use strict";

import "./style/main.css";

import { loadController, renderToDOM, loadSnapshot, exportSnapshot } from "./logic/inc-controller.js";


const display = document.getElementById("content");

const btProjects = document.getElementById("btProjects");
const btTasks = document.getElementById("btTasks");
const btImport = document.getElementById("btImport");
const btExport = document.getElementById("btExport");

btProjects.addEventListener("click", () => {
    renderToDOM("Projects");
});
btTasks.addEventListener("click", () => {
    renderToDOM("Tasks");
});
btImport.addEventListener("click", () => {
    loadSnapshot();
});
btExport.addEventListener("click", () => {
    exportSnapshot();
});

loadController();