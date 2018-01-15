const {app, BrowserWindow} = require('electron');
const path = require('path');

let mainWindow;

app.on("ready", ()=>{
    mainWindow = new BrowserWindow({show: false});
    mainWindow.loadURL(path.join("file://", __dirname, "index.html"));
    
    // Load DOM when window is ready to show
    mainWindow.on("ready-to-show", ()=>{
        mainWindow.show();
    })
});