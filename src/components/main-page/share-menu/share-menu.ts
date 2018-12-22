class ShareMenu {
    constructor() {
        this.items.forEach((el) => el.addEventListener('pm-changed', () => {
            console.log(1);
        }))
    }

    get items() {
        const els = document.querySelectorAll('.share-trigger') as NodeListOf<HTMLElement>;
        return els ? Array.from(els) : [];
    }
}

export default ShareMenu;
