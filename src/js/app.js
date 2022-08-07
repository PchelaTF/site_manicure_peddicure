import * as ptsFunctions from './modules/functions.js';
import Swiper, { Navigation, Pagination } from 'swiper';
import { menuBurger } from './modules/burger.js';
import { scrollToElement } from './modules/scroll-to-element.js';
import { modal } from './modules/modal.js';
import Inputmask from "../../node_modules/inputmask/dist/inputmask.es6.js";
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

modal({
    modalSelector: '.modal',
    modalBtnSelector: '#modalBtn',
    closeModalBtnSelector: '.modal__close',
    bodySelector: 'body',
    headerSelector: '.header',
});

// ===================================

const form = document.querySelector('#form');
const telSelector = form.querySelector('input[type="tel"]');
const inputTelMask = new Inputmask('+38 (999) 999-99-99');
inputTelMask.mask(telSelector);
form.addEventListener('submit', sendForm);
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     telTest();
//     sendForm();
// });

async function sendForm(e) {
    e.preventDefault();

    let error = formValidate();

    let formData = new FormData(form);

    if (error === 0) {
        form.classList.add('_sending');
        let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            let result = await response.json();
            alert(result.message);
            form.reset();
            form.classList.remove('_sending');
        } else {
            alert("Ошибка");
            form.classList.remove('_sending');
        }
    } else {
        alert('Заполните необходимые поля');
    }
}

function formValidate() {
    let error = 0;
    let formRequiredFilds = document.querySelectorAll('._required');

    for (let i = 0; i < formRequiredFilds.length; i++) {
        const input = formRequiredFilds[i];
        formRemoveError(input);

        if (input.classList.contains('_phone')) {
            if (!telTest()) {
                formAddError(input);
                error++;
            }
        } else {
            if (input.value === '') {
                formAddError(input);
                error++;
            }
        }
    }

    return error;
}

function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
}

function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
}

function telTest() {
    const phone = telSelector.inputmask.unmaskedvalue();
    return Number(phone) && phone.length === 10;
}
