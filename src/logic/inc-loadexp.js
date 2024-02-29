function loadSnapshot(source = "localStorage") {
    console.log("Import from ", source);
    // let snapshot = window.showOpenFilePicker();
}

function exportSnapshot() {
    console.log("Export to JSON file");
}

export { loadSnapshot, exportSnapshot };