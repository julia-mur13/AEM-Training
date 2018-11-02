import PopupTrigger from "../../../core/PopupMenu/PopupTrigger";

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
            this.btn.innerHTML = `Lang: ${this.menuArr[value].innerText}`;
        }
    }

    public connectedCallback() {
        super.connectedCallback();
    }

    public triggerInput(event: MouseEvent) {
        const target = event.target as HTMLElement;
        this.active = +target.dataset.menuItem - 1;
    }
}

customElements.define(DropdownInput.is, DropdownInput);


export default DropdownInput;
