export default function Polyfill() {
    window.customElements = window.customElements || {};
    window.customElements.root = '../../node_modules/@webcomponents/webcomponentsjs/';
}
