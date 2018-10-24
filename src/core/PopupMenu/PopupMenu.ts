import PopupTrigger from './PopupTrigger';

class PopupMenu extends HTMLElement {
    static get is() {
        return 'popup-menu';
    }

    constructor() {
        super();
    }

    private _btn: PopupTrigger;

    get activeIndex() {
        return this.menuItems.findIndex((el) => el.classList.contains('active-menu-item'));
    }

    set activeIndex(value: number) {
        this.menuItems[this.activeIndex].classList.remove('active-menu-item');
        this.menuItems[value].classList.add('active-menu-item');
        this._btn.rerender(this.menuItems[value].innerText);
    }

    get menuItems(): HTMLElement[] {
        const els = this.querySelectorAll('[data-menu-item]') as NodeListOf<HTMLDivElement>;
        return els ? Array.from(els) : [];
    }

    private connectedCallback() {
        this.bindEvents();
    }

    private bindEvents() {
        this._btn = this.previousElementSibling as PopupTrigger;
        this._btn.addEventListener('pm-showmenu', () => this._onShowMenu());
        this.addEventListener('click', (event) => this._onUpdate(event));
    }

    public _onShowMenu() {
        this.classList.toggle('active-menu');
    }

    private _onUpdate(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const nextIndex = +target.dataset.menuItem - 1;
        if (this.activeIndex !== nextIndex) {
            this.activeIndex = nextIndex;
        }
        this._onShowMenu();
    }
}

customElements.define(PopupMenu.is, PopupMenu);

export default PopupMenu;
