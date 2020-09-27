const menuHamburger = document.querySelector(".hamburger-menu");

const navbar = document.querySelector(".navbar");

menuHamburger.addEventListener("click", () => {
    navbar.classList.toggle("change");
})