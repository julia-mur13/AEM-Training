class PopupContent extends HTMLElement {
    static get is() {
        return 'popup-content';
    }


    constructor() {
        super();
    }

    get btn(): HTMLElement {
        return this.previousElementSibling.querySelector('[data-popup-btn]') as HTMLElement;
    }

    public _onShowLang(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const btnText = 'Lang: ' + target.innerText;
        this.btn.textContent = btnText;
    }

    private connectedCallback() {
        this.addEventListener('click', (event) => this._onShowLang(event));
    }
}

customElements.define(PopupContent.is, PopupContent);

export default PopupContent;
