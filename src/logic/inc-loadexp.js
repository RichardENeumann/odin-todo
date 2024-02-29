function loadSnapshot(source = "localStorage") {
    console.log("Import from ", source);
}

function exportSnapshot() {
    console.log("Export to JSON file");
}

export { loadSnapshot, exportSnapshot };