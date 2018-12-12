import DropdownInput from "../../dropdown-menu/dropdown-input";
import API from "../API";
import LabelI18n from "./label-i18n";


let instance: Localization;

class Localization {

    currentLocale: string;
    translations: { [key: string]: string };
    elms: LabelI18n[];

    constructor() {
        if (instance) {
            return instance;
        }
        instance = this;

        this.elms = [];
        instance.input.addEventListener('dd-inputchanged', (event: CustomEvent) => {
            this.currentLocale = event.detail.value;
            API.sendRequest(this.currentLocale).then((trans) => {
                this.translations = trans;
                this.elms.forEach((el) => {
                    el.value = this.getLocalizedValue(el.enValue);
                });
            }).catch((error) => {
                console.log(error);
            });
        });
    }

    get input(): DropdownInput {
        return document.getElementById('dropdown-input') as DropdownInput;
    }

    getLocalizedValue(key: string): string {
        return this.translations[key];
    }

    subscribe(obj: any) {
        this.elms.push(obj)
    }

    unsubscribe(obj: any) {
        const index = this.elms.indexOf(obj);
        this.elms.splice(index, 1);
    }
}

export default Localization;
