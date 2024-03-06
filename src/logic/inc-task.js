import { snapshot } from "../index.js";

export { createTask };

function findUnusedId() {
    // find unused id in snapshot.tasks
    return 10;
}

function createTask(title = "Example Task") {
    let newTask = {
        title, 
        "id": findUnusedId(),
        "todo" : new Date().toISOString(),  
        "doing": false,   
        "done": false
    };
    // Check if snapshot is empty before pushing new task
    if ("tasks" in snapshot) {
        snapshot.tasks.push(newTask)    
    } else {
        snapshot.tasks = [];
        snapshot.tasks.push(newTask)
    }
}