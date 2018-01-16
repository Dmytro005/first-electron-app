const { app, Menu } = require('electron');

const {showMessage} = require("./dialogs.js");
const {showSaveDialog} = require("./dialogs.js");

const isWindows = process.platform == "win32";

module.exports = {
    setMainMenu
};

function setMainMenu(mainWindow) {
    const template = [
        {
            label: isWindows ? "File" : app.getName(),
            submenu: [
                {
                    label: isWindows ? "Exit" : `Quit ${app.getName()}`,
                    accelerator: isWindows ? 'Alt+F4' : 'CmdOrCTRL+Q',
                    click() {
                        app.quit();
                    }
                },
                {
                    label: "Say hello",
                    click(){
                        showMessage(mainWindow);
                        // console.log("Showw");
                    }
                },
                {
                    label: "Save memory Usage info",
                    click(){
                        showSaveDialog(mainWindow);
                    }
                },
                {
                    label: "Open File",
                    click(){

                    }
                },
            ]
        },
        {
            role: 'Help',
            submenu: [
                {
                    label: 'Learn More',
                    click() { require('electron').shell.openExternal('https://electron.atom.io'); }
                }
            ]
        },
        {
            label: "Edit",
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                {
                    label: "I`m hungry",
                    type: 'checkbox'
                },
                {
                    label: "I'm dima",
                    type: 'radio'
                },
                {
                    label: "I'm superman",
                    type: 'radio'
                },
                { type: 'separator' },

                { role: 'toggledevtools' },
                { role: 'cut' },
                { role: 'paste' },
                { role: 'copy' },
            ]
        },
        {
            label: "Window",
            submenu: [
                { role: 'toggledevtools' },
                { role: 'zoomin' },
                { role: 'zoomout' },
                { role: 'resetzoom' },
            ]
        },
        {
            role: "windowMenu"
        }

    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

}

