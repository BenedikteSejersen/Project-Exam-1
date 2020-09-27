let loader = document.querySelector(".loader");
loader.innerHTML = `<div class="loading-container">
<div class="loading-rocket"></div>
<div class="loading-earth"><img src="../../icons/earth.png" alt="earth"></div>
</div>`;

const navContainer = document.querySelector(".container");
const mobileNavContainer = document.querySelector(".navbar");

function loading() {
    document.querySelector("html").style.overflow = "hidden";
    loader = setTimeout(showLoading, 3000);
}

function showLoading() {
    document.querySelector(".loader").remove();
    document.querySelector("html").style.overflow = "visible";
}