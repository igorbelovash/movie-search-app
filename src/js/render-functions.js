import { genresDictionary } from "./tmbd-api";

const loadMoreBtn = document.querySelector(".load-more-btn");

function createMarkup(arr) {
    return arr.map(({ id, poster_path, original_title, release_date, overview, genre_ids}) => 
        `
            <li class="movie-list-item" data-id=${id}>
                <div class="movie-img-wrapper">
                    <img class="movie-img" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${original_title}"/>
                    <p class="movie-item-text">${overview}</p>
                </div>
                <div class="movie-content">
                    <h4 class="movie-title">${original_title}</h4>
                    <div class="movie-info">
                        <p class="release-date">${release_date.split('-')[0]}</p>
                        <p class="movie-genre">${genresDictionary[genre_ids[0]] ? `&nbsp;| ${genresDictionary[genre_ids[0]]}` : ''}</p>
                    </div>
                </div>
            </li>
        `
    ).join("")
}

function showLoadMoreButton() {
    loadMoreBtn.classList.remove("hidden");
}

function hideLoadMoreButton() {
    loadMoreBtn.classList.add("hidden");
}

export { createMarkup , showLoadMoreButton, hideLoadMoreButton};