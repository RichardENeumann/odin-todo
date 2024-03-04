export { renderToAppConsole, renderToDisplay };

function renderToAppConsole(appConsole, text) {
    appConsole.innerText = text;
}

function renderToDisplay(display, content) {
    display.innerText = content;
}

