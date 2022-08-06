export const modal = (props) => {
    const modal = document.querySelector(props.modalSelector);
    const modalBtn = document.querySelectorAll(props.modalBtnSelector);
    const closeModalBtn = document.querySelector(props.closeModalBtnSelector);
    const body = document.querySelector(props.bodySelector);
    const header = document.querySelector(props.headerSelector);
    let initScroll = window.innerWidth - body.offsetWidth;
    const scrollWidtn = calcScroll();

    modalBtn.forEach(btn => btn.addEventListener('click', openModal));
    closeModalBtn.addEventListener('click', closeModal);

    const definitionScrollPosition = () => window.pageYOffset;

    function preventMovingTop() {
        let scrollPosition = definitionScrollPosition();

        body.style.position = 'fixed';
        body.style.top = -scrollPosition + 'px';

        if (initScroll) {
            body.style.paddingRight = `${scrollWidtn}px`;
            header.style.paddingRight = `${scrollWidtn}px`;
        }
    }

    function beforeClose() {
        const scrollY = document.body.style.top;

        body.style.top = '';
        body.style.position = '';
        header.style.paddingRight = '';
        body.style.paddingRight = '';

        window.scrollTo(0, parseInt(scrollY || 0) * -1);
    }

    function openModal(e) {
        e.preventDefault();
        preventMovingTop();
        body.classList.add('_lock');
        modal.classList.add('_open');
    }

    function closeModal() {
        beforeClose();
        modal.classList.remove('_open');
        body.classList.remove('_lock');
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
};