class LabelI18n extends HTMLElement {
    static get is() {
        return 'label-i18n';
    }

    constructor() {
        super();
    }

    get value() {
        return this.textContent;
    }

    set value(value: string) {
        this.textContent = '';
    }
}

customElements.define(LabelI18n.is, LabelI18n);

export default LabelI18n;
