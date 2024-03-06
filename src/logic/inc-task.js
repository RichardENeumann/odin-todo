import { snapshot } from "../index.js";

export { createTask };

function createTask(title = "Example Task") {
    let todo = new Date();
    console.log(snapshot.tasks);
    let newTask = {
        title, 
        todo     
    };
}