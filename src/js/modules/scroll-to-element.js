export const scrollToElement = params => {
    // выбираем ссылки по котрым будем отправлятся к элементам
    const links = document.querySelectorAll(params.selector);
    // добавляем им событие и функцию
    links.forEach(link => link.addEventListener('click', gotoElement));

    // функция которая будет осуществлять задуманное
    function gotoElement(e) {
        // отменяем стандартное поведение браузера
        e.preventDefault();
        // 
        const element = e.target;
        // проверяем заполнен ли дата атрибут у ссылки и существует ли элемент к которму будем выполнять скролить
        if (element.dataset.goto && document.querySelector(element.dataset.goto)) {
            // высота хэдэра 
            const headerHight = document.querySelector(params.headerSelector).offsetHeight;
            // элемент к которму будем скролить
            const elementGoto = document.querySelector(element.dataset.goto);
            // положение этого элемента от верха страницы
            const elementTop = elementGoto.getBoundingClientRect().top;

            if (params.scrollY) {
                // складываем в переменную сколько нужно проскролить от топа. params.offset - дополнительный отступ если нужен.
                const goTo = (elementTop + scrollY - headerHight) + params.offset;

                //  основная функция которая и производит скрол
                window.scrollTo({
                    top: goTo,
                    behavior: 'smooth',
                });
            } else {
                const goTo = (elementTop - headerHight) + params.offset;

                //  основная функция которая и производит скрол
                window.scrollTo({
                    top: goTo,
                    behavior: 'smooth',
                });
            }
        }
    }
};