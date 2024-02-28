import { loadSnapshot, exportSnapshot } from "./inc-loadexp.js";
import { createProject } from "./inc-project.js";
import { createTask } from "./inc-task.js";


import { renderToDOM } from "./inc-render.js";

function loadController() {
    console.log("Controller online.");
    loadSnapshot();
    createProject();
    createTask();

    renderToDOM("Projects");
}

export { loadController };