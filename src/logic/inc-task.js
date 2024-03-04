import { snapshot } from "./inc-storagehandler.js";

function createTask(title = "Example Task", todo = new Date(), doing = false, done = false) {
    console.log(title, todo, doing, done);
    let pTask = {
        title, todo, doing, done
    }
    return pTask;
}

function loadTasks(snapshot) {
     return snapshot

}

let processedTasks = loadTasks(snapshot);

export { createTask, processedTasks };