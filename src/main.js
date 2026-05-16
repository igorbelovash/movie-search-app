import { serviceMovie, getAndStoreGenres} from "./js/tmbd-api";
import { createMarkup, showLoadMoreButton, hideLoadMoreButton } from "./js/render-functions";
import { initSearch } from "./js/search";

const movieList = document.querySelector(".movie-list");
const loadMoreBtn = document.querySelector(".load-more-btn");

const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const listContainer = document.querySelector(".movie-list-container");

let allMovies = [];
let showMoviesCount = 0;
let currentPage = 1;
let isLastPage = false;

let currentOffset = 0;
const cardWidth = 218;
const gap = 24;       
const step = cardWidth + gap;

async function init() {
    await getAndStoreGenres();
    await loadAndShow();
}

init();

initSearch();

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
    if (nextBanch.length > 0) {
        movieList.insertAdjacentHTML("beforeend", createMarkup(nextBanch));
        showMoviesCount += nextBanch.length;
    }

    if (window.innerWidth < 1200) {
        if (isLastPage && showMoviesCount >= allMovies.length) {
            hideLoadMoreButton();
        } else {
            loadMoreBtn.disabled = false;
        }
    }
}

loadMoreBtn.addEventListener("click", loadAndShow);

movieList.addEventListener("click", (event) => {
    const card = event.target.closest(".movie-list-item");

    if (!card) return;
    const isAlreadyOpen = card.classList.contains('is-visible');

    document.querySelectorAll('.movie-list-item.is-visible').forEach(item => {
        item.classList.remove('is-visible');
    });

    if (!isAlreadyOpen) {
        card.classList.add('is-visible');
    }
});

const updateListTransform = () => {
    movieList.style.transform = `translateX(${currentOffset}px)`;
};

function moveSlider(direction) {
    if (window.innerWidth < 1200) return;

    if (direction === 'next') {
        const maxOffset = -(movieList.scrollWidth - listContainer.clientWidth);
        if (currentOffset > maxOffset) {
            currentOffset -= step;
        }
    } else if (direction === 'back') {
        if (currentOffset < 0) {
            currentOffset += step;
        }
    }
    
    updateListTransform();
}

nextBtn.addEventListener('click', async () => {
    const maxOffset = -(movieList.scrollWidth - listContainer.clientWidth);
    if (currentOffset <= maxOffset + (step * 3) && !isLastPage) {
        await loadAndShow();
    }

    moveSlider('next');
});

prevBtn.addEventListener('click', () => moveSlider('back'));
