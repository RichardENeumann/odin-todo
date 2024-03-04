export { snapshot, saveState, importSnapshot, exportSnapshot };

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
        return "Saved to LocalStorage";
    }
    else return "Nothing to save";
}
// Load external JSON file as snapshot
function importSnapshot(fileSelector) {
    if (fileSelector.files.length != 0) {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
           snapshot = JSON.parse(reader.result);
        });
        reader.readAsText(fileSelector.files[0]);
        return "Read successfully";
    } else {
        return "Nothing selected"
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
    } else {
        return "Nothing to export";
    }
}