class Modal {
    constructor(props) {
        let defaultConfig = {
            linkAttributeName: 'data-hystmodal',
        };
        this.config = Object.assign(defaultConfig, props);
        this.init();
    }

    init() {
        this.isOpened = false;
        this.openedWindow = false;
        this._modalBlock = false;
        this.starter = false;
        this._nextWindows = false;
        this._scrollPosition = 0;

        this.eventsFeeler();
    }

    eventsFeeler(){
        document.addEventListener("click", function (e) {
            const clickedlink = e.target.closest("[" + this.config.linkAttributeName + "]");

            if (clickedlink) { 
                e.preventDefault();
                this.starter = clickedlink;
                let targetSelector = this.starter.getAttribute(this.config.linkAttributeName);
                this._nextWindows = document.querySelector(targetSelector);
                this.open();
                return;
            }

            if (e.target.closest('[data-hystclose]')) {
                this.close();
                return;
            }
        }.bind(this));
    }
}