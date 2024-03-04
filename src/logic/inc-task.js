export { createTask };

function createTask(title = "Example Task", todo = new Date(), doing = false, done = false) {
    console.log(title, todo, doing, done);
    let pTask = {
        title, todo, doing, done
    }
    return pTask;
}