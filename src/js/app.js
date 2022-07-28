import * as ptsFunctions from './modules/functions.js';

ptsFunctions.isWebp();

import Swiper, { Navigation, Pagination } from 'swiper';
import { scrollToElement } from './modules/scroll-to-element.js';

const workSlider = new Swiper('.work__slider', {
    slidesPerView: 1,
    loop: true,
    modules: [Navigation, Pagination],
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        1170: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 94,
        },
        991.87: {
            slidesPerView: 2.5,
            slidesPerGroup: 2.5,
            spaceBetween: 95,
        }
    }
});

const sliderReviews = new Swiper('.reviews__slider', {
    slidesPerView: 2,
    slidesPerGroup: 2,
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
});



// ===================================

const menuIcon = document.querySelector('.menu__icon');
const menuBurger = document.querySelector('.menu__burger');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('_active');
    menuBurger.classList.toggle('_active');
});

// ===================================

scrollToElement({
    selector: '.menu__link[data-goto]',
    headerSelector: '.header',
    offset: 102,
    scrollY: true, // or false
});