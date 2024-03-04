import { snapshot } from "./inc-storagehandler.js";

function createTask(title = "Example Task", todo = new Date(), doing = false, done = false) {
    console.log(title, todo, doing, done);
    let pTask = {
        title, todo, doing, done
    }
    return pTask;
}

function loadTasks(snapshot) {
    snapshot.forEach(element => { 
        if (element.todo) { 
            element.todo = new Date(element.todo);
        }        
        if (element.doing) { 
            element.doing = new Date(element.doing);
        }
        if (element.done) { 
            element.done = new Date(element.done);
        }        
     });
     return snapshot
}

let processedTasks = loadTasks(snapshot);

export { createTask, processedTasks };