import { taskList } from "./tmp-data.js";

let snapshot = {};

function loadSnapshot() {
    snapshot = taskList;
}

function importSnapshot() {
    console.log("Import");
}

function exportSnapshot() {
    console.log("Export");
}

function saveState() {
    console.log("Save");
}

loadSnapshot();

export { snapshot };