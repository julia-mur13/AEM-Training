class ToggleSwitch extends HTMLElement {
    static get is() {
        return 'toggle-switch'
    };

    constructor() {
        super();
    }

    connectedCallback() {
        console.log(this.tgl, 5);
        this.tgl.addEventListener('click',  this._onChange)
    }

    get tgl(): HTMLInputElement {
        return this.querySelector('#theme-toggle-switch') as HTMLInputElement;
    }

    private _onChange(event: MouseEvent) {
        const target = event.target as HTMLInputElement;
        target.checked ?
            document.querySelector('html').setAttribute('theme', 'dark') :
            document.querySelector('html').setAttribute('theme', 'light');
    }
}

customElements.define(ToggleSwitch.is, ToggleSwitch);
