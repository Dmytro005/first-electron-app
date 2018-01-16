const {app, BrowserWindow} = require('electron');
const path = require('path');

const {setMainMenu} = require("./main-menu.js");

let mainWindow;

app.on("ready", ()=>{
    mainWindow = new BrowserWindow({show: false, width: 1200, height: 600 });
    mainWindow.loadURL(path.join("file://", __dirname, "index.html"));
    
    // Load DOM when window is ready to show
    mainWindow.on("ready-to-show", ()=>{
        mainWindow.show();
    });
    
    mainWindow.webContents.openDevTools();

    setMainMenu(mainWindow);
});