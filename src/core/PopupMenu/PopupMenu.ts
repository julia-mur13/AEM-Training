class PopupMenu extends HTMLElement {
    static get is() { return 'popup-menu'; }

    constructor() {
        super();
    }
}

customElements.define(PopupMenu.is, PopupMenu);

export default PopupMenu;
