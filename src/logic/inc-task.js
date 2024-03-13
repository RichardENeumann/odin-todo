import { snapshot } from "../index.js";

export { findUnusedId, createTask, editTask, deleteTask };

function findUnusedId(target) {
    // target = projects or tasks
    // First sort all id numbers into an array by ascending order
    const helper = snapshot[target].toSorted((a, b) => (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0);

    // Find first unused id by comparing index to id key
    let unusedId = 0;
    while (unusedId < helper.length && unusedId === helper[unusedId].id) {
        unusedId++;
    }
    return unusedId;
}

function createTask(title = "Example Task") {
    const newTask = {
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

function editTask(id, title, todo, doing, done) {
    const taskIndex = snapshot.tasks.findIndex(el => el.id == id);

    snapshot.tasks[taskIndex].title = (title) ? title : "Example Task";
    snapshot.tasks[taskIndex].todo = (todo) ? new Date(todo).toISOString() : new Date().toISOString();
    snapshot.tasks[taskIndex].doing = (doing) ? new Date(doing).toISOString() : false;
    snapshot.tasks[taskIndex].done = (done) ? new Date(done).toISOString() : false;
}

function deleteTask(id) {
    const taskIndex = snapshot.tasks.findIndex(el => el.id == id);

    // Remove from tasks list
    snapshot.tasks.splice(taskIndex, 1);
    
    // Remove from projects' children lists
    snapshot.projects.forEach(el => {
        const i = el.children.indexOf(+id);
        if (i > -1) {
            el.children.splice(i, 1);
        }
    });
}