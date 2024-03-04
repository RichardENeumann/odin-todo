export { renderToAppConsole, renderToMainDisplay };

function renderToAppConsole(text) {
    appConsole.innerText = text;
}

function renderToMainDisplay(display, selection) {
    display.innerText = selection;
}

