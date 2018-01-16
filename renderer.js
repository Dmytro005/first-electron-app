
const { ipcRenderer } = require('electron');
const versionEL = document.querySelector("#version");
const CountEL = document.querySelector("#window-count");
const path = require('path');

const { remote } = require('electron');
const currentWindow = remote.getCurrentWindow();

require('devtron').install();


function onBlur() {
    document.body.style = 'opacity: 0.2;';
}

function onFocus() {
    document.body.style = 'opacity: 1;';
}

currentWindow.on('blur', onBlur);
currentWindow.on('focus', onFocus);

window.addEventListener('beforeunload', () => {
    currentWindow.removeAllListeners();
});

document.querySelector("#remote-window").addEventListener("click", () => {
    let win = new remote.BrowserWindow({
        width: 400,
        height: 200
    });
    win.loadURL(path.join('file://', __dirname, "remote-window.html"));
    // win.loadURL(path.join('file://', __dirname, "index.html"));
})

versionEL.innerText = process.versions.electron;

ipcRenderer.on("window-count", (event, props) => {
    CountEL.textContent = props.count;
});

ipcRenderer.send('get-window-count');

document.querySelector("#create-window").addEventListener('click', () => {
    ipcRenderer.send("create-window", {
        x: 0,
        y: 0
    });
});

// GEt movies
let moviesList = document.getElementById('movies');

function addMoviesToList(movie) {
    let img = document.createElement('img');
    img.src = movie.Poster;
    moviesList.appendChild(img);

    // console.log(img);
}

function getData(movie) {
    let url = `http://www.omdbapi.com/?apikey=608c0982&s=${movie}`

    return new Promise(function (resolve, reject) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);

        xhr.onload = function () {
            if (xhr.status === 200) {
                let json = JSON.parse(xhr.response);
                // console.log(json);
                resolve(json.Search);
            } else {
                reject(xhr.statusText);
            }
        };

        xhr.onerror = function (error) {
            reject(error);
        }

        xhr.send();
    });
}

let ShowMovie = (movies) => {
    movies.forEach(movie =>
        addMoviesToList(movie));
};

document.querySelector("#showMovies").addEventListener("click", () => {
    getData("superman").then(response => ShowMovie(response));
});
