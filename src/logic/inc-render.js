export { renderToAppConsole, renderToDisplay };

function renderToAppConsole(message) {
    document.getElementById("appConsole").innerText = message;
}

function renderToDisplay(content) {
    document.getElementById("content").innerText = JSON.stringify(content, null, 2);
}

