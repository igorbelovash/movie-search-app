import { serviceMovie, getAndStoreGenres } from "./js/tmbd-api";
import { createMarkup, showLoadMoreButton, hideLoadMoreButton } from "./js/render-functions";

const movieList = document.querySelector(".movie-list");
const loadMoreBtn = document.querySelector(".load-more-btn");

let allMovies = [];
let showMoviesCount = 0;
let currentPage = 1;
let isLastPage = false;

async function init() {
    await getAndStoreGenres();
    await loadAndShow();
}

init();

async function loadAndShow() {
    loadMoreBtn.disabled = true;

    if (allMovies.length - showMoviesCount < 6 && !isLastPage) {
        try {
            const data = await serviceMovie(currentPage);

            if (!data || !data.results) return;

            if (currentPage === 1) {
                showLoadMoreButton();
            }

            if (currentPage >= data.total_pages) {
                isLastPage = true;
            }

            allMovies = [...allMovies, ...data.results];
            currentPage++;
        } catch (error) {
            console.log(error.message);
            hideLoadMoreButton();
        }
    }

    const nextBanch = allMovies.slice(showMoviesCount, showMoviesCount + 6);
    movieList.insertAdjacentHTML("beforeend", createMarkup(nextBanch));
    showMoviesCount += nextBanch.length;

    if (isLastPage && showMoviesCount >= allMovies.length) {
        hideLoadMoreButton();
    } else {
        loadMoreBtn.disabled = false;
    }
}

loadMoreBtn.addEventListener("click", loadAndShow);
movieList.addEventListener("click", (event) => {
    const card = event.target.closest(".movie-list-item");
    console.log(card);
    
    if (!card) return;

    const isAlreadyOpen = card.classList.contains('is-visible');

    document.querySelectorAll('.movie-list-item.is-visible').forEach(item => {
        item.classList.remove('is-visible');
    });

    if (!isAlreadyOpen) {
        card.classList.add('is-visible');
    }
});