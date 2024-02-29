import { loadSnapshot, exportSnapshot } from "./inc-loadexp.js";
import { loadProjects } from "./inc-project.js";
import { loadTasks } from "./inc-task.js";
import { renderToDOM } from "./inc-render.js";

function loadController() {
    console.log("Controller online.");
    loadSnapshot();
    loadProjects();
    loadTasks();

    renderToDOM("Projects");
}

export { 
    loadController, 
    renderToDOM,    //inc-render.js
    loadSnapshot,   //inc-loadexp.js
    exportSnapshot, //*
};