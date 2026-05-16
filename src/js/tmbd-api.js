import axios from 'axios';

const BASE_URL = "https://api.themoviedb.org/3";
const TRENDING_END_POINT = "/trending/movie/day";
const GENRE_END_POINT = "/genre/movie/list";
const SEARCH_END_POINT = "/search/movie";
const token = import.meta.env.VITE_MOVIE_TOKEN;

let genresDictionary = {};

async function serviceMovie(page) {
    const { data } = await axios.get(`${BASE_URL}${TRENDING_END_POINT}`, {
        params: {
            page,
        },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });

    return data;
}

async function serviceMovieGenre() {
    const { data } = await axios.get(`${BASE_URL}${GENRE_END_POINT}`, {
        params: {
            language: "en",
        },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });

    return data;
}

async function getAndStoreGenres() {
    try {
        const { genres } = await serviceMovieGenre();
        const dictionary = genres.reduce((acc, currentGenre) => {
            acc[currentGenre.id] = currentGenre.name;       
            return acc;
        }, {});
        
        genresDictionary = dictionary;  
    } catch (error) {
        console.log(error);
        
    }
}

async function fetchMoviesByQuery(query) {
    const { data } = await axios.get(`${BASE_URL}${SEARCH_END_POINT}`, {
        params: {
            query,
            include_adult: true,
            language: "en",
        },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });

    return data;
}

export { serviceMovie, getAndStoreGenres, genresDictionary, fetchMoviesByQuery };