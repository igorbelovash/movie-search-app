import{a as h}from"./assets/vendor-B1ZHW564.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function c(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=c(e);fetch(e.href,o)}})();const M="https://api.themoviedb.org/3",g="/trending/movie/day",y="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGIyYTJjMDMxMTM4ZmM0MmFjNzZiNTBjYjM2MzYzYyIsIm5iZiI6MTc3ODUxMjkyMi44OTIsInN1YiI6IjZhMDFmNDFhMmNmMzU0MjMwMmNhYmQzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-EXygFMgjTxyEK5u7kl9Fa5C2gS46ahwf8XKIyNNPb0";async function v(i){const{data:t}=await h.get(`${M}${g}`,{params:{page:`${i}`},headers:{accept:"application/json",Authorization:`Bearer ${y}`}});return t}const f=document.querySelector(".load-more-btn");function I(i){return i.map(({id:t,poster_path:c,original_title:s,release_date:e,overview:o})=>`
            <li class="movie-list-item" data-id=${t}>
                <div class="movie-img-wrapper">
                    <img class="movie-img" src="https://image.tmdb.org/t/p/w500${c}" alt="${s}"/>
                    <p class="movie-item-text">${o}</p>
                </div>
                <div class="movie-content">
                    <h4 class="movie-title">${s}</h4>
                    <p class="release-date">${e}</p>
                </div>
            </li>
        `).join("")}function L(){f.classList.remove("hidden")}function m(){f.classList.add("hidden")}const N=document.querySelector(".movie-list"),u=document.querySelector(".load-more-btn");let r=[],n=0,a=1,d=!1;async function p(){if(u.disabled=!0,r.length-n<6&&!d)try{const t=await v(a);if(!t||!t.results)return;a===1&&L(),a>=t.total_pages&&(d=!0),r=[...r,...t.results],a++}catch(t){console.log(t.message),m()}const i=r.slice(n,n+6);N.insertAdjacentHTML("beforeend",I(i)),n+=i.length,d&&n>=r.length?m():u.disabled=!1}p();u.addEventListener("click",p);
//# sourceMappingURL=index.js.map
