const { dialog, app, nativeImage} = require ('electron');
const fs = require('fs');
const path = require('path');

module.exports = {showMessage, showSaveDialog, showOpenDialog};


function showMessage(browserWindow) {
    dialog.showMessageBox(browserWindow, {
        type:'info',
        message: "Excepteur pariatur exercitation magna quiLorem ",
        detail: "It's a detail", 
        buttons: ["My Button", "Cancel"],
        defaultId: 0
    }, (clickedIndex) => {
        console.log(clickedIndex);
    });
}

function showSaveDialog(browserWindow) {
    dialog.showSaveDialog(browserWindow, {
        defaultPath: path.join(app.getPath('downloads'), "memory-info.txt")
    }, (filename) => {
        if (filename){
            const memInfo = JSON.stringify(process.getProcessMemoryInfo(), null, 2);
            fs.writeFile(filename, memInfo, 'utf8', (err) =>{
                if (err){
                    dialog.showErrorBox("Save failed", err.message);
                }
            })
        };
    });
}

function showOpenDialog(browserWindow) {
    dialog.showOpenDialog(browserWindow, {
        defaultPath: app.getPath('downloads'),
        filters: [ {name: "Text Files", extensions: ["txt"] } ]
    }, (filepath) => {
        if (filepath){
            console.log(filepath, fs.readFileSync(filepath[0], "utf8"));
        };
    });
}