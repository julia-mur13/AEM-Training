import PopupTrigger from "../../../core/PopupMenu/PopupTrigger";
import PopupMenu from "../../../core/PopupMenu/PopupMenu";

class DropdownInput extends PopupTrigger {
    static get is() {
        return 'dropdown-input';
    }

    constructor() {
        super();
    }

    get menuArr(): HTMLElement[] {
        const els = this.popup.querySelectorAll('[data-menu-item]') as NodeListOf<HTMLElement>;
        return els ? Array.from(els) : [];
    }

    get active(): number {
        return this.menuArr.findIndex((el) => el.classList.contains('active-menu-item'));
    }

    set active(value: number) {
        if (this.active !== value) {
            this.menuArr[this.active].classList.remove('active-menu-item');
            this.menuArr[value].classList.add('active-menu-item');
            this.btn.innerHTML =  `Lang: ${this.menuArr[value].innerText}`;
        }
    }

    public connectedCallback() {
        super.connectedCallback();
        this.popup.addEventListener('click', (event) => this._onChange(event));
    }

    private _onChange(event: MouseEvent) {
        const target = event.target as HTMLElement;
        this.active = +target.dataset.menuItem - 1;
        this.popup.triggerMenu();
    }
}

customElements.define(DropdownInput.is, DropdownInput);


export default DropdownInput;
