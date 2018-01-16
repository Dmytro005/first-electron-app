const versionEL = document.querySelector("#version");

versionEL.innerText = process.versions.electron;

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

document.querySelector("#showMovies").addEventListener("click", () =>{
    getData("superman").then(response => ShowMovie(response));
});