import * as ptsFunctions from './modules/functions.js';
import Swiper, { Navigation, Pagination } from 'swiper';
import { menuBurger } from './modules/burger.js';
import { scrollToElement } from './modules/scroll-to-element.js';

// ===================================

ptsFunctions.isWebp();

// ===================================

const workSlider = new Swiper('.work__slider', {
    slidesPerView: 1,
    loop: true,
    modules: [Navigation, Pagination],
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    spaceBetween: 20,
    setWrapperSize: true,
    breakpoints: {
        1170: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 94,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        },
        767.98: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            // spaceBetween: 80,
            spaceBetween: 30,
            setWrapperSize: true,
        },
    },
});

const sliderReviews = new Swiper('.reviews__slider', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    // loop: true,  
    modules: [Navigation, Pagination],
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    spaceBetween: 34,
    setWrapperSize: true,
    breakpoints: {
        1170: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 34,
        },
        767.98: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            slidesOffsetBefore: 50,
        },
        564.98: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            slidesOffsetBefore: 33,
        },
        413.98: {
            slidesOffsetBefore: 65,
        }
    },
});

// ===================================

menuBurger({
    menuIconSelector: '.menu__icon',
    menuBurgerSelector: '.menu__burger',
});

// ===================================

scrollToElement({
    selector: '.menu__link[data-goto]',
    headerSelector: '.header',
    offset: 102,
    scrollY: true, // or false
});
