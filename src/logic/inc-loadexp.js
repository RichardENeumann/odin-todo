function loadSnapshot(source = "localStorage") {
    console.log("Import from JSON file" + source);
}

function exportSnapshot() {
    console.log("Export to JSON file");
}

export { loadSnapshot, exportSnapshot };