const burgerBtn = document.querySelector(".burger");
const headerNav = document.querySelector(".header__nav");
const navLinks = document.querySelectorAll(".nav-item a");

// const slider = document.querySelector(".slider");
const sliderWrap = document.querySelector(".slider-wrapper");


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


document.addEventListener("DOMContentLoaded", function() {
  const slider = document.querySelector(".slider");
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const sliderItemWidth = slider.querySelector(".slider-item").offsetWidth;

  const indicators = document.querySelectorAll(".slider-indicator");

  const btnRight = document.querySelector(".slider__btn-right");
  const btnLeft = document.querySelector(".slider__btn-left");

  let currentSlide = 0;
  let intervalId;

  function slideLeft() {
    const currentLeft = parseInt(slider.style.left) || 0;
    const nextLeft = currentLeft - sliderItemWidth;

    if (nextLeft <= -slider.clientWidth) {
      slider.style.left = 0;
      currentSlide = 0;
    } else {
      slider.style.left = nextLeft + "px";
      currentSlide++;
    }

    updateIndicators();
  }

  function slideRight() {
    const currentLeft = parseInt(slider.style.left) || 0;
    const nextLeft = currentLeft + sliderItemWidth;

    if (currentSlide === 0) {
      slider.style.left = -((indicators.length - 1) * sliderItemWidth) + "px";
      currentSlide = indicators.length - 1;
    } else {
      slider.style.left = nextLeft + "px";
      currentSlide--;
    }

    updateIndicators();
  }

  function updateIndicators() {
    indicators.forEach((indicator, index) => {
      if (index === currentSlide) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  }

  function startInterval() {
    intervalId = setInterval(slideLeft, 5000);
  }

  function pauseInterval() {
    clearInterval(intervalId);
  }

  function pauseIndicators() {
    indicators.forEach((indicator, index) => {
      if (index === currentSlide) {
        indicator.classList.add("paused");
        indicator.style.animationPlayState = "paused";
      }
    });
  }

  function resumeIndicators() {
    indicators.forEach(indicator => {
      indicator.classList.remove("paused");
      indicator.style.animationPlayState = "running";
    });
  }

  btnRight.addEventListener("click", function() {
    slideLeft();
  });

  btnLeft.addEventListener("click", function() {
    slideRight();
  });

  sliderWrapper.addEventListener("mouseenter", function() {
    pauseInterval();
    pauseIndicators();
  });

  sliderWrapper.addEventListener("mouseleave", function() {
    resumeIndicators();
    startInterval();
  });

  let touchStartX;

  sliderWrapper.addEventListener("touchstart", function(e) {
    pauseInterval();
    pauseIndicators();
    touchStartX = e.touches[0].clientX;
  });

  sliderWrapper.addEventListener("touchend", function(e) {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchEndX < touchStartX) {
      slideLeft();
    }else{
      slideRight();
    }
    resumeIndicators();
    startInterval();
  });

  startInterval();
});









