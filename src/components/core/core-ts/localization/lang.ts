class Lang {

    lang: string;
    word: string;

    constructor(lang: string, word: string) {
        this.lang = lang;
        this.word = word;
    }

    get data(): any {
        return {
            "en": {
                "Text": "Text",
                "Write a Feedbook": "Write a Feedbook",
                "Lang": "Lang",
                "en": "en",
                "rus": "rus",
                "do": "do",
                "Next": "Next",
                "Previous": "Previous"
            },
            "rus": {
                "Text": "Текст",
                "Write a Feedbook": "Написать Фидбук",
                "Lang:": "Язык",
                "en": "англ",
                "rus": "рус",
                "do": "до",
                "Next": "Вперед",
                "Previous": "Назад"
            },
            "do": {
                "Text": "Текст",
                "Write a Feedbook": "Написать Фидбук",
                "Lang": "Язык",
                "en": "англ",
                "rus": "рус",
                "do": "до",
                "Next": "Вперед",
                "Previous": "Назад"
            }
        } as any;
        // } as { [key: string]: {[key: string]: string} };
    }

    get translation() {
        const langWords: any = this.data[this.lang];
        if (this.word === 'Lang') {
            return langWords[this.word] + ':' + langWords[this.lang];
        }
        return langWords[this.word];
    }
}

export default Lang;
