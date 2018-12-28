import PopupTrigger from "../../core/popup-menu/popup-trigger";

class ShareMenu extends HTMLElement {

    static get is() { return 'share-menu'; }

    constructor() {
        super();
    }

    connectedCallback() {
        this.addEventListener('pm-changed', () => {
            const text = this.querySelector('.text-share') as HTMLElement;
            if (text) {
                text.classList.contains('hide-text-share') ? text.classList.add('hide-text-share') : text.classList.remove('hide-text-share');
            }
            this.classList.contains('open-share-trigger') ? text.classList.add('open-share-trigger') : text.classList.remove('open-share-trigger');
        });
    }

    get items() {
        const els = this.querySelectorAll('.share-trigger') as NodeListOf<PopupTrigger>;
        return els ? Array.from(els) : [];
    }
}

customElements.define(ShareMenu.is, ShareMenu);

export default ShareMenu;
