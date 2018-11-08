import PopupMenu from "../../core/PopupMenu/PopupMenu";
import DropdownInput from "./DropdownInput";

class DropdownMenu extends PopupMenu {
    static get is() {
        return 'dropdown-menu';
    }

    constructor() {
        super();
    }

    public connectedCallback() {
        this.addEventListener('click', (event) => this._onChange(event));
    }

    get input(): DropdownInput {
        return document.getElementById('dropdown-input') as DropdownInput;
    }

    get activeIndex(): number {
        return this.menuArr.findIndex((els) => els.classList.contains('active-menu-item'));
    }

    set activeIndex(index: number) {
        this.menuArr[this.activeIndex].classList.remove('active-menu-item');
        this.menuArr[index].classList.add('active-menu-item');
    }

    get menuArr(): HTMLElement[] {
        const els = this.querySelectorAll('[data-menu-item]') as NodeListOf<HTMLElement>;
        return els ? Array.from(els) : [];
    }

    private _onChange(event: MouseEvent) {
        const target = event.target as HTMLElement;
        this.input.triggerInput(target.textContent);
        this.activeIndex = +target.dataset.menuItem - 1;
        this.triggerMenu();
    }
}

customElements.define(DropdownMenu.is, DropdownMenu);

export default DropdownMenu;
