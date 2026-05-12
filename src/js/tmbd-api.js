import axios from 'axios';

const BASE_URL = "https://api.themoviedb.org/3";
const END_POINT = "/trending/movie/day";
const token = import.meta.env.VITE_MOVIE_TOKEN;

export default async function serviceMovie(page) {
    const { data } = await axios.get(`${BASE_URL}${END_POINT}`, {
        params: {
            page: `${page}`,
        },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return data;
}