import PopupTrigger from "../popup-menu/popup-trigger";

class DropdownInput extends PopupTrigger {
    static get is() {
        return 'dropdown-input';
    }

    constructor() {
        super();
    }

    get value(): string {
        return this.textContent;
    }

    set value(value: string) {
        this.btn.innerText = this.dataset.inputValue.replace('$', value);
    }

    public connectedCallback() {
        this.classList.add('dropdown-input');
        super.connectedCallback();
    }

    public triggerInput(value: string) {
        if (this.value !== value) {
            this.value = value;
        }
    }
}

customElements.define(DropdownInput.is, DropdownInput);

export default DropdownInput;
