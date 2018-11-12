// import PopupMenu from "../../core/popup-menu/popup-menu";
//
// class VideoOverlay {
//     constructor() {
//         // JD
//     }
//
//     _popup: PopupMenu;
//
//     get content(): DocumentFragment {
//         const template = document.querySelector('#video-popup-template') as HTMLTemplateElement;
//         return template.content;
//     }
//
//
//     public init() {
//         this.posts.forEach((el) => el.addEventListener('click', (event) => this._onChange(event), false));
//     }
//
//     get posts(): HTMLElement[] {
//         const els = document.querySelectorAll('.post') as NodeListOf<HTMLDivElement>;
//         return els ? Array.from(els) : [];
//     }
//
//     private insertVideo() {
//         const clone = document.importNode(this.content, true);
//         this._popup = clone.querySelector('popup-menu') as PopupMenu;
//         document.querySelector('#video-popup-container').appendChild(clone);
//         this._popup.triggerMenu();
//     }
//
//     private _onChange(event: MouseEvent) {
//         event.preventDefault();
//         const target = event.target as HTMLElement;
//         const attrValue = target.getAttribute('href');
//         if (target.tagName === 'A' && attrValue.includes('youtube.com')) {
//             this.insertVideo();
//         }
//     }
// }
//
// export default VideoOverlay;
