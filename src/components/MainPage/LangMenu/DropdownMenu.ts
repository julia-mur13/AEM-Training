import PopupMenu from "../../../core/PopupMenu/PopupMenu";
import DropdownInput from "./DropdownInput";

class DropdownMenu extends PopupMenu {
    static get is() {
        return 'dropdown-input';
    }

    constructor() {
        super();
    }

    get input(): DropdownInput {
        return this.previousElementSibling as DropdownInput;

    }

    // get menuArr(): HTMLElement[] {
    //     const els = this.popup.querySelectorAll('[data-menu-item]') as NodeListOf<HTMLElement>;
    //     return els ? Array.from(els) : [];
    // }
    //
    // get active(): number {
    //     return this.menuArr.findIndex((el) => el.classList.contains('active-menu-item'));
    // }
    //
    // set active(value: number) {
    //     if (this.active !== value) {
    //         this.menuArr[this.active].classList.remove('active-menu-item');
    //         this.menuArr[value].classList.add('active-menu-item');
    //         this.btn.innerHTML = `Lang: ${this.menuArr[value].innerText}`;
    //     }
    // }

    public connectedCallback() {
        this.addEventListener('click', (event) => this._onChange(event));
    }

    private _onChange(event: MouseEvent) {
        this.input.triggerInput(event);
    }
}

customElements.define(DropdownMenu.is, DropdownMenu);


export default DropdownMenu;
