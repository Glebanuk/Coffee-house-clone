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


// ------------------------------Categories of products-------------------------------------------------------

//-----------btns behavior--------------------------\\

const btnCoffeMenu = document.querySelector(".coffe-btn");
const btnTeaMenu = document.querySelector(".tea-btn");
const btnDessertsMenu = document.querySelector(".desert-btn");
const btnLoadMore = document.querySelector(".menu__refresh-btn");

const cofeeList = document.querySelector(".coffee-list");
const teaList = document.querySelector(".tea-list");
const dessertsList = document.querySelector(".desserts-list");


const itemsCoffee = document.querySelectorAll(".coffee-list li");
const itemsTea = document.querySelectorAll(".tea-list li");
const itemsDesserts = document.querySelectorAll(".desserts-list li");
let maxVisible = 4;


//  hide extra items on mob dev
function applyStylesToMenuItems(items, maxVisible) {
  if (window.innerWidth < 769) {
    items.forEach((item, index) => {
      if (index < maxVisible) {
        item.style.position = 'static';
      } else {
        item.style.position = 'absolute';
      }
    });
  }
}

// switch category and display More btn

function toggleActiveCategory(btn, list, items, ) {
  btn.addEventListener("click", () => {
    [btnCoffeMenu, btnTeaMenu, btnDessertsMenu].forEach(menuBtn => {
      menuBtn.classList.remove('active');
    });

    
    btn.classList.add('active');

    [cofeeList, teaList, dessertsList].forEach(menuList => {
      menuList.style.display = 'none';
    });

    
    list.style.display = 'flex';
    // visible items in menu

    if (window.innerWidth < 768){
    btnLoadMore.style.display = "inline-block";
  }

    applyStylesToMenuItems(items, maxVisible);

  });

}

toggleActiveCategory(btnCoffeMenu, cofeeList,itemsCoffee,  );
toggleActiveCategory(btnTeaMenu, teaList, itemsTea, );
toggleActiveCategory(btnDessertsMenu, dessertsList, itemsDesserts, );


//---------------refresh btn-----------------

btnLoadMore.addEventListener("click", () =>{
  itemsMenu.forEach((item) =>{
    item.style.position = "static";
  })
  btnLoadMore.style.display = "none";

})


// ------------------------------Popup window-------------------------------------------------------
const popup = document.querySelector(".popup");
const btnPopupClose = document.querySelector(".popup__close-btn");
const itemsMenu = document.querySelectorAll(".menu-items__list li");



itemsMenu.forEach((item) => {
  item.addEventListener('click', (event) =>{
    // event.stopPropagation();
    openPopup()
  })
})

function openPopup() {
  popup.classList.add("popup-active");
  document.body.style.overflow = "hidden";
}


function closePopup(){
  popup.classList.remove("popup-active");
  document.body.style.overflow = "auto";
}

btnPopupClose.addEventListener("click", () =>{
  closePopup()
})



