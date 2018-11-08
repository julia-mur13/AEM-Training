class VideoPopup {
    constructor() {
        // JD
    }

    public connectedCallback() {
        this.bindEvents();
    }

    get content(): DocumentFragment {
        const template = document.querySelector('#video-popup-template') as HTMLTemplateElement;
        return template.content;
    }

    // get container(): HTMLElement {
    //
    // }

    bindEvents() {
        this.posts.forEach((el) => el.addEventListener('click', (event) => this._onChange(event), false));
    }

    get posts(): HTMLElement[] {
        const els = document.querySelectorAll('.post') as NodeListOf<HTMLDivElement>;
        return els ? Array.from(els) : [];
    }

    private insertVideo() {
        const clone = document.importNode(this.content, true);
        document.querySelector('#video-popup-container').appendChild(clone);
    }

    private _onChange(event: MouseEvent) {
        event.preventDefault();
        const target = event.target as HTMLElement;
        const attrValue = target.getAttribute('href');
        if (target.tagName === 'A' && attrValue.includes('youtube.com')) {
            this.insertVideo();
        }
    }
}

export default VideoPopup;
