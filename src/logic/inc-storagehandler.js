export { saveState, importSnapshot, exportSnapshot, snapshot };

let snapshot = {};

// Try to load data from localStorage
if (!localStorage.getItem("localSnapshot") == "") {
    snapshot = JSON.parse(localStorage.getItem("localSnapshot"));
}

// Save current state to localStorage
function saveState() {
    if (Object.keys(snapshot) != 0) { 
        let processedSnapshot = JSON.stringify(snapshot, null, 2);
        localStorage.clear();
        localStorage.setItem("localSnapshot", processedSnapshot);
    }
}
// Load external JSON file as snapshot
function importSnapshot(fileSelector) {
    if (fileSelector.files.length != 0) {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
           // JSON.parse(reader.result);
        });
        reader.readAsText(fileSelector.files[0]);
    }
}

// Export current state to JSON file
function exportSnapshot() {
    if (Object.keys(snapshot) != 0) { 
        let processedSnapshot = JSON.stringify(snapshot, null, 2);
    
        // Download JSON file 
        let element = document.createElement("a");
            element.setAttribute("href", "data:application/json;charset=utf-8," + encodeURIComponent(processedSnapshot));
            element.setAttribute("download", "tadaSnapshot-" + new Date().toISOString().split('T')[0]);
            element.style.display = "none";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);

        document.getElementById("dlgExported").showModal();
    }
}