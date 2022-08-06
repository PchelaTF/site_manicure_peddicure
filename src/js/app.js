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


// ===================================
const modal = document.querySelector('.modal');
const modalBtn = document.querySelectorAll('#modalBtn');
const closeModalBtn = document.querySelector('.modal__close');
const body = document.querySelector('body');
const html = document.documentElement;
const header = document.querySelector('.header');
let isOpened = false;
let paddingOfSet = window.innerWidth - body.offsetWidth;

const scrollWidtn = calcScroll();

modalBtn.forEach(btn => btn.addEventListener('click', openModal));
closeModalBtn.addEventListener('click', closeModal);

const definitionScrollPosition = () => window.pageYOffset;

function preventMovingTop() {
    let scrollPosition = definitionScrollPosition();

    body.style.position = 'fixed';
    body.style.top = -scrollPosition + 'px';

    // body.style.overflowY = 'overlay';

    if (paddingOfSet) {
        body.style.paddingRight = `${scrollWidtn}px`;
        header.style.paddingRight = `${scrollWidtn}px`;
        modal.style.paddingRight = `${scrollWidtn}px`;
    }
}

function beforeClose() {
    const scrollY = document.body.style.top;

    body.style.top = '';
    body.style.position = '';

    body.style.paddingRight = '';
    header.style.paddingRight = '';
    modal.style.paddingRight = '';

    window.scrollTo(0, parseInt(scrollY || 0) * -1);
}

function openModal(e) {
    e.preventDefault();
    isOpened = true;
    preventMovingTop();
    body.classList.add('_lock');
    // html.classList.add('_lock');
    modal.classList.add('_open');
}

function closeModal() {
    isOpened = false;
    beforeClose();
    modal.classList.remove('_open');
    body.classList.remove('_lock');
    // html.classList.remove('_lock');
}

const closeListener = e => {
    if (e.target.dataset.close) {
        closeModal();
    }
};

function calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);

    let scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();

    return scrollWidth;
}

modal.addEventListener('click', closeListener);