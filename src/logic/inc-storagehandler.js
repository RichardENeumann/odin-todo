export { loadOnStartup, saveState, importSnapshot, exportSnapshot };

// Try to load data from localStorage
function loadOnStartup() {
    if (!localStorage.getItem("localSnapshot") == "") {
        return JSON.parse(localStorage.getItem("localSnapshot"));
    } else {
        return {}
    }
}

// Save current state to localStorage
function saveState(snapshot) {
    if (Object.keys(snapshot) != 0) { 
        let processedSnapshot = JSON.stringify(snapshot, null, 2);
        localStorage.clear();
        localStorage.setItem("localSnapshot", processedSnapshot);
        return true;
    }
    else return false;
}

// Load external JSON file as snapshot
function importSnapshot(fileSelector) {
    if (fileSelector.files.length != 0) {
        let processedImport;
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          processedImport = JSON.parse(reader.result);
        });
        reader.readAsText(fileSelector.files[0]);
        return processedImport;
    } else {
        return false
    }
}

// Export current state to JSON file
function exportSnapshot(snapshot) {
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
        return true;
    } else {
        return false;
    }
}