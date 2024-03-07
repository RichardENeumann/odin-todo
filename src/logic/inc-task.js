import { snapshot } from "../index.js";

export { createTask, findUnusedId };

function findUnusedId(target) {
    // First sort all id numbers into an array by ascending order
    let helper = snapshot[target].toSorted((a, b) => (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0);

    console.log(snapshot[target]);
    // Find first unused id by comparing index to id key
    let unusedId = 0;
    while (unusedId < helper.length && unusedId === helper[unusedId].id) {
        unusedId++;
    }
    return unusedId;
}

function createTask(title = "Example Task") {
    let newTask = {
        title, 
        "id": findUnusedId("tasks"),
        "todo" : new Date().toISOString(),  
        "doing": false,   
        "done": false
    };
    // Check if snapshot is empty before pushing new task
    if ("tasks" in snapshot) {
        snapshot.tasks.push(newTask);
    } else {
        snapshot.tasks = [];
        snapshot.tasks.push(newTask);
    }
}