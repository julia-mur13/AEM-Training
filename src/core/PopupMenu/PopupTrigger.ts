class PopupTrigger extends HTMLElement {
    static get is() { return 'popup-trigger'; }

    constructor() {
        super();
    }
}

customElements.define(PopupTrigger.is, PopupTrigger);

export default PopupTrigger;
