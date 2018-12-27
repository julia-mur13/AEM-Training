import PopupTrigger from "../../core/popup-menu/popup-trigger";

class ShareMenu {
    constructor() {
        this.items.forEach((el: HTMLElement) => el.addEventListener('pm-changed', () => {
            const text = el.querySelector('label-i18n') as HTMLElement;
            if (text) {
                text.classList.toggle('hide-text-share');
            }
            el.classList.toggle('open-share-trigger');
        }))
    }

    get items() {
        const els = document.querySelectorAll('.share-trigger') as NodeListOf<PopupTrigger>;
        return els ? Array.from(els) : [];
    }
}

export default ShareMenu;
