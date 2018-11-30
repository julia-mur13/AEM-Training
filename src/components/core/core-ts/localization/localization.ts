import DropdownMenu from "../../dropdown-menu/dropdown-menu";

class Localization {

    constructor() {
        const lang: string = this.lang;
        this.menu.addEventListener('dd-menuchanged', (event: MouseEvent) => this._onChange(event, lang));
    }

    get menu(): DropdownMenu {
        return document.getElementById('dropdown-menu') as DropdownMenu;
    }

    get lang(): string {
        return this.menu.input.value;
    }

    private _onChange(event: MouseEvent, value: string) {
        console.log(5);
        // const target = event.target as HTMLElement;
        // const newLang = target.textContent;
        // if (value !== newLang) {
        //    this.items.forEach((elem: HTMLElement) => {
        //        const text: string = elem.dataset.langItem;
        //        const lang = new Lang(newLang, text);
        //        elem.innerText = lang.translation;
        //    });
        // }
    }
}

export default Localization;