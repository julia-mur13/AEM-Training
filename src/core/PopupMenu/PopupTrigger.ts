import PopupMenu from './PopupMenu';

class PopupTrigger extends HTMLElement {
    static get is() {
        return 'popup-trigger';
    }

    get btn(): HTMLButtonElement{
        return this.querySelector('[data-popup-btn]') as HTMLButtonElement;
    }

    constructor() {
        super();
    }

    private connectedCallback() {
        this.addEventListener('click', () => this.triggerShowMenu(), false);
        // this.btn.addEventListener('blur', () => this.triggerShowMenu(), false);
    }


    private triggerShowMenu() {
        const event = new CustomEvent('pm-showmenu', {
            bubbles: true
        });
        this.dispatchEvent(event);
    }
}

customElements.define('popup-trigger', PopupTrigger);

export default PopupTrigger;
