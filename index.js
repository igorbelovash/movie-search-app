import{a as h}from"./assets/vendor-B1ZHW564.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function c(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=c(e);fetch(e.href,o)}})();const g="https://api.themoviedb.org/3",v="/trending/movie/day",y=void 0;async function L(r){const{data:t}=await h.get(`${g}${v}`,{params:{page:`${r}`},headers:{accept:"application/json",Authorization:`Bearer ${y}`}});return t}const m=document.querySelector(".load-more-btn");function $(r){return r.map(({id:t,poster_path:c,original_title:s,release_date:e,overview:o})=>`
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
        `).join("")}function b(){m.classList.remove("hidden")}function f(){m.classList.add("hidden")}const M=document.querySelector(".movie-list"),u=document.querySelector(".load-more-btn");let i=[],n=0,a=1,d=!1;async function p(){if(u.disabled=!0,i.length-n<6&&!d)try{const t=await L(a);if(!t||!t.results)return;a===1&&b(),a>=t.total_pages&&(d=!0),i=[...i,...t.results],a++}catch(t){console.log(t.message),f()}const r=i.slice(n,n+6);M.insertAdjacentHTML("beforeend",$(r)),n+=r.length,d&&n>=i.length?f():u.disabled=!1}p();u.addEventListener("click",p);
//# sourceMappingURL=index.js.map
