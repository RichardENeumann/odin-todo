import { taskList } from "./tmp-data.js";

let snapshot = {};

function loadSnapshot() {
    snapshot = taskList;
}

function importSnapshot() {
    console.log("Import");
}

function exportSnapshot() {
    let processedSnapshot = JSON.stringify(snapshot, null, 2);
    
    let element = document.createElement("a");
        element.setAttribute("href", "data:application/json;charset=utf-8," + encodeURIComponent(processedSnapshot));
        element.setAttribute("download", "tadaSnapshot-" + new Date().toISOString().split('T')[0]);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    document.getElementById("dlgExported").showModal();
}

function saveState() {
    console.log("Save");
}

loadSnapshot();

export { saveState, importSnapshot, exportSnapshot, snapshot };