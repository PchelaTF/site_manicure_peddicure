import { scrollToElement } from "./scroll-to-element.js";

export const menuBurger = (params) => {

    const menuIcon = document.querySelector(params.menuIconSelector);
    const menuBurger = document.querySelector(params.menuBurgerSelector);
    const body = document.querySelector('body');
    const html = document.documentElement;

    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            if (menuIcon.classList.contains('_active')) {
                closeMenuBurger();
            } else {
                openMenuBurger();
            }
        });
    }

    function openMenuBurger() {
        menuIcon.classList.add('_active');
        menuBurger.classList.add('_active');
        body.classList.add('_lock');
        // body.style.position = 'fixed';
    }

    function closeMenuBurger() {
        // body.style.position = '';
        body.classList.remove('_lock');
        menuIcon.classList.remove('_active');
        menuBurger.classList.remove('_active');
    }

    scrollToElement({
        selector: '.menu__burger-link[data-goto]',
        headerSelector: '.header',
        offset: 50,
        scrollY: true, // or false
    });

    const burgerLink = document.querySelectorAll('.menu__burger-link[data-goto]');

    burgerLink.forEach(link => link.addEventListener('click', closeMenuBurger));
};