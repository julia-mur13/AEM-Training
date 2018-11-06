import PopupTrigger from "../../../core/PopupMenu/PopupTrigger";

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
