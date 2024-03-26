// Initialize snapshot and try to load data from localStorage
export function loadOnStartup() {
  const initSnapshot = {
    options: {
      view: "tasks",
      sortAscending: true,
    },
    projects: [],
    tasks: [],
  };

  if (localStorage.getItem("localSnapshot")) {
    const parsedSnapshot = JSON.parse(localStorage.getItem("localSnapshot"));
    initSnapshot.options = parsedSnapshot.options;
    initSnapshot.projects = parsedSnapshot.projects;
    initSnapshot.tasks = parsedSnapshot.tasks;
  }
  return initSnapshot;
}

// Evaluate if the snapshot is well formed to avoid trouble with malformed JSON imports
export function evalSnapshot(currentSnapshot) {
  const evaluatedSnapshot = currentSnapshot;
  return evaluatedSnapshot;
}

// Save current state to localStorage
export function saveState(currentSnapshot) {
  const processedSnapshot = JSON.stringify(currentSnapshot, null, 2);
  localStorage.clear();
  localStorage.setItem("localSnapshot", processedSnapshot);
}

// Load external JSON file as snapshot
export function importSnapshot(fileSelector) {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException("There was a problem with the file."));
    };
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsText(fileSelector.files[0]);
  });
}

// Export current state to JSON file
export function exportSnapshot(currentSnapshot) {
  const processedSnapshot = JSON.stringify(currentSnapshot, null, 2);

  // Download JSON file
  const el = document.createElement("a");
  el.setAttribute("href", `data:application/json;charset=utf-8, ${encodeURIComponent(processedSnapshot)}`);
  el.setAttribute("download", `tadaSnapshot-${Math.round(new Date().getTime() / 1000)}`);
  el.style.display = "none";
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
}
