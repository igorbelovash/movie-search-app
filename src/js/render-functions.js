const loadMoreBtn = document.querySelector(".load-more-btn");

function createMarkup(arr) {
    return arr.map(({ id, poster_path, original_title, release_date, overview}) => 
        `
            <li class="movie-list-item" data-id=${id}>
                <div class="movie-img-wrapper">
                    <img class="movie-img" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${original_title}"/>
                    <p class="movie-item-text">${overview}</p>
                </div>
                <div class="movie-content">
                    <h4 class="movie-title">${original_title}</h4>
                    <p class="release-date">${release_date}</p>
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