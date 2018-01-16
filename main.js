const {app, BrowserWindow, ipcMain} = require('electron');

const path = require('path');

const {setMainMenu} = require("./main-menu.js");

let mainWindow;
let windows = [];

function createBrowserWindow(props){
    let win = new BrowserWindow(Object.assign({show: false, width: 1200, height: 600 }, props));
    
    windows.push(win);
    win.loadURL(path.join("file://", __dirname, "index.html"));
    
    win.on("ready-to-show", ()=>{
        win.show();
    });

    win.on("close", ()=>{
        windows.slice(windows.indexOf(win), 1)
    });

}

app.on("ready", ()=>{
    setMainMenu(mainWindow);

    createBrowserWindow();

    ipcMain.on("create-window", (event, props)=>{
        createBrowserWindow(props);
    });
    
});

