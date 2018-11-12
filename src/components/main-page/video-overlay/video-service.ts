import PopupMenu from "../../core/popup-menu/popup-menu";

class VideoService {
    constructor() {
        // JD
    }

    _popup: PopupMenu;

    get content(): DocumentFragment {
        const template = document.querySelector('#video-popup-template') as HTMLTemplateElement;
        return template.content;
    }

    get clone(): DocumentFragment {
        return document.importNode(this.content, true);
    }

    get iframe(): HTMLIFrameElement {
        return this.clone.querySelector('iframe') as HTMLIFrameElement;
    }

    public insertVideo(srcValue: string) {
        const fragment = this.clone;
        const iframe = fragment.querySelector('iframe') as HTMLIFrameElement;
        this._popup = fragment.querySelector('popup-menu') as PopupMenu;
        iframe.src = srcValue;
        this._popup.triggerMenu();
        document.querySelector('#video-popup-container').appendChild(fragment);
    }
}

export default VideoService;
