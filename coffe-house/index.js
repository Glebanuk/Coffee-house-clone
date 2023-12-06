const burgerBtn = document.querySelector(".burger");
const headerNav = document.querySelector(".header__nav");
const navLinks = document.querySelectorAll(".nav-item a");

// ---------------------------burger menu behavior----------------------

burgerBtn.addEventListener("click", (e) => {
    headerNav.classList.toggle("header__nav-active");
    burgerBtn.classList.toggle("cross");

    document.body.style.overflow = headerNav.classList.contains("header__nav-active") ? "hidden" : "auto"; // запрет скролла
})

navLinks.forEach((link) =>{
    link.addEventListener("click", (e) =>{
        e.preventDefault;

        const linkTarget = link.getAttribute("href");
        const targetElement = document.querySelector(linkTarget);

        if(targetElement){
            targetElement.scrollIntoView;
        }

        headerNav.classList.remove("header__nav-active");
        burgerBtn.classList.remove("cross");

        document.body.style.overflow = "auto";

    })

})

// ------------------------------slider------------------------------------


