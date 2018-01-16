const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { setMainMenu } = require("./main-menu.js");

let mainWindow;
let windows = [];


function createBrowserWindow(browserOptions) {
    let win = new BrowserWindow(Object.assign({
        show: true,
        width: 700,
        height: 600
    }, browserOptions));

    windows.push(win);
    win.loadURL(path.join("file://", __dirname, "index.html"));

    win.on("ready-to-show", () => {
        win.show();
    });

    win.on("close", () => {
        windows.splice(windows.indexOf(win), 1);
        sendWindowCount();
    });

}

function sendWindowCount() {
    windows.forEach(win => {
        win.webContents.send('window-count', { count: windows.length });
    });
}

app.on("ready", () => {
    setMainMenu(mainWindow);
    ipcMain.on("create-window", (event, props) => createBrowserWindow(props) );
    ipcMain.on("get-window-count", sendWindowCount);
    createBrowserWindow();
});