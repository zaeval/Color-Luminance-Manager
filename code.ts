// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function sendSelectColor() {
    const selection = figma.currentPage.selection.filter(
        // @ts-ignore
        node => node.fills.length > 0 && node.fills[0].type === 'SOLID'
    )

    // @ts-ignore
    const fills = selection.map(node => node.fills[0])
    figma.ui.postMessage(rgbToHex(Math.round(fills[0].color.r * 255), Math.round(fills[0].color.g * 255), Math.round(fills[0].color.b * 255)));
}
figma.on('selectionchange', () => {
    if (figma.currentPage.selection.length > 0) {
        sendSelectColor();
    }
});
figma.showUI(__html__);
sendSelectColor();


