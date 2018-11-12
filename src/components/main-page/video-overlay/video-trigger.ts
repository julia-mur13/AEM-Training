import VideoService from "./video-service";

class VideoTrigger {
    constructor() {
        // JD
    }

    _service: VideoService;

    public init() {
        this.posts.forEach((el) => el.addEventListener('click', (event) => this._onChange(event), false));
        // this.hideBtn.addEventListener('click', (event) => this._onChange(event), false);
    }

    get posts(): HTMLElement[] {
        const els = document.querySelectorAll('.post') as NodeListOf<HTMLDivElement>;
        return els ? Array.from(els) : [];
    }

    get hideBtn(): HTMLElement {
        return document.querySelector('hide-video-btn') as HTMLElement;
    }

    private _onChange(event: MouseEvent) {
        event.preventDefault();
        this._service = new VideoService();
        const target = event.target as HTMLElement;
        const attrValue = target.getAttribute('href');
        if (target.tagName === 'A' && attrValue.includes('youtube.com')) {
            this._service.insertVideo(attrValue);
        }
    }
}

export default VideoTrigger;
