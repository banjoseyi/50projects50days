const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'


const main = document.querySelector('.grid');
const search = document.getElementById('search');
const form = document.querySelector('form');

getMovies(API_URL)

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results);
        // console.log(data.results);
    })
}


function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview } = movie;
        const movieEL = document.createElement('div');
        movieEL.classList.add('movie');
        movieEL.innerHTML = ` <div class="movie_img">
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        </div>
        <div class="movie_name">
        <h3>${title} <span class="${getColor(vote_average)}">${vote_average}</span></h3>
        </div>
        <div class="overView">
        <h3>Overview</h3>
        <p>${overview}</p>
        </div>
    `

        main.appendChild(movieEL);
    })
}

function getColor(vote) {
    if (vote >= 8) {
        return 'green'
    }
    else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.ariaValueMax

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)
        search.value = ''
    }else {
        window.location,reload()
    }
})