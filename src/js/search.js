import { fetchMoviesByQuery } from "./tmbd-api"
import { debounce } from "./utils/debounce";
import { renderSearchResults } from "./render-functions";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const searchContainer = document.querySelector("#search-results");
const searchList = document.querySelector(".search-section-list");

export function initSearch() {
    const searchForm = document.querySelector("#search");
    const searchInput = document.querySelector("#search-field");
    const openBtn = document.querySelector(".search-open-btn");
    const sidebarBtn = document.querySelector(".sidebar-open-btn");
    const searchResults = document.querySelector("#search-results");

    if (!searchForm || !openBtn) return;

    openBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        searchForm.classList.add("is-focused");
        sidebarBtn.style.display = "none";
        searchInput.focus();
    });

    document.addEventListener("click", (event) => {
        if (!searchForm.contains(event.target)) {
            searchForm.classList.remove("is-focused");
            sidebarBtn.style.display = "block";
            searchResults.classList.remove("is-visible");
            searchInput.value = "";
        }
    });

    const debounceHandle = debounce(handleSearch, 500);
    searchInput.addEventListener("input", debounceHandle);
}

async function handleSearch(event) { 
    const query = event.target.value.trim();

    if (query.length === 0) {
        searchList.innerHTML = "";
        searchContainer.classList.remove("is-visible");
        return;
    }
    
    try {
        const { results } = await fetchMoviesByQuery(query);
        if (!results.length) {
            searchContainer.classList.remove("is-visible");

            iziToast.show({
                title: 'We could not find anything.',
                message: 'Maybe you should try a different search term?',
                color: '#EF4040',
                messageColor: '#FAFAFB',
                titleColor: '#FAFAFB'
            });

            return;
        }

        searchList.innerHTML = renderSearchResults(results);
        searchContainer.classList.add("is-visible");
    } catch (error) {
        iziToast.show({
            color: '#EF4040',
            messageColor: '#FAFAFB',
            message: `${error.message}`,
        });
    }
}

