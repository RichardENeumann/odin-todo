import { processedProjects } from "./inc-project.js";
import { processedTasks } from "./inc-task.js";

function loadController() {
    console.log("Controller online.");
  //  console.log(processedTasks);
  //  console.log(processedProjects);
}

export { 
    loadController, 
    processedTasks,
    processedProjects,
};