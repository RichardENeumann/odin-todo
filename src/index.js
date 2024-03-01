"use strict";

import "./style/main.css";

import { 
    loadController,
    processedTasks,
    processedProjects,
 } from "./logic/inc-controller.js";
 
import { renderToDOM } from "./logic/inc-render.js";

const display = document.getElementById("content");

const btProjects = document.getElementById("btProjects");
const btTasks = document.getElementById("btTasks");
const btImport = document.getElementById("btImport");
const btExport = document.getElementById("btExport");
const btAbout = document.getElementById("btAbout");

btProjects.addEventListener("click", () => {
    renderToDOM("Projects");
});
btTasks.addEventListener("click", () => {
    renderToDOM("Tasks");
});
btImport.addEventListener("click", () => {
    importSnapshot();
});
btExport.addEventListener("click", () => {
    exportSnapshot();
});
btAbout.addEventListener("click", () => {
    alert("tada! v0.0.1 - RichardNeumann@gmail.com");
});

loadController();
renderToDOM("Projects");