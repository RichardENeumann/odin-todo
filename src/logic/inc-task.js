// Within the given array, find the lowest unassigned project/task id
export function findUnusedId(currentSnapshot, target) {
  // target = projects or tasks
  // First sort all id numbers into an array by ascending order
  const sortedList = currentSnapshot[target].toSorted((a, b) => {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  });
  // Find first unused id by comparing index to id key
  let unusedId = 0;
  while (unusedId < sortedList.length && unusedId === sortedList[unusedId].id) {
    unusedId += 1;
  }
  return unusedId;
}

export function createTask(currentSnapshot, title) {
  const newTask = {
    title,
    id: findUnusedId(currentSnapshot, "tasks"),
    todo: new Date().toISOString(),
    doing: false,
    done: false,
  };
  currentSnapshot.tasks.push(newTask);
}

export function editTask(currentSnapshot, id, title, todo, doing, done) {
  const taskIndex = currentSnapshot.tasks.findIndex(el => el.id === +id);
  const currentSnapshotHelper = currentSnapshot;

  currentSnapshotHelper.tasks[taskIndex].title = (title || "Example Task");
  currentSnapshotHelper.tasks[taskIndex].todo = (todo)
    ? new Date(todo).toISOString()
    : new Date().toISOString();
  currentSnapshotHelper.tasks[taskIndex].doing = (doing)
    ? new Date(doing).toISOString()
    : false;
  currentSnapshotHelper.tasks[taskIndex].done = (done)
    ? new Date(done).toISOString()
    : false;
}

export function deleteTask(currentSnapshot, id) {
  const taskIndex = currentSnapshot.tasks.findIndex(el => el.id === +id);

  // Remove from tasks list
  currentSnapshot.tasks.splice(taskIndex, 1);
  // Remove from projects' children lists
  currentSnapshot.projects.forEach(el => {
    const i = el.children.indexOf(+id);
    if (i > -1) {
      el.children.splice(i, 1);
    }
  });
}
