import VideoService from "./video-service";

class VideoTrigger {
    constructor() {
        // JD
    }

    _service: VideoService;

    public init() {
        this.posts.forEach((el) => el.addEventListener('click', (event) => this._onOpen(event), false));

        // this.hideBtn.addEventListener('click', (event) => this._onChange(event), false);
    }

    private_onHide() {
        this._service._popup.triggerMenu()
    }

    get posts(): HTMLElement[] {
        const els = document.querySelectorAll('.post') as NodeListOf<HTMLDivElement>;
        return els ? Array.from(els) : [];
    }

    get hideBtn(): HTMLElement {
        return document.querySelector('.hide-video-btn') as HTMLElement;
    }

    private _onOpen(event: MouseEvent) {
        event.preventDefault();
        this._service = new VideoService();
        const target = event.target as HTMLElement;
        const attrValue = target.getAttribute('href');
        if (target.tagName === 'A' && (attrValue.includes('youtube.com') || attrValue.includes('youtu.be'))) {
            this._service.insertVideo(attrValue);
        }
        this.hideBtn.removeEventListener('click', () => this._service._popup.triggerMenu());
        this.hideBtn.addEventListener('click', () => );
    }
}

export default VideoTrigger;
