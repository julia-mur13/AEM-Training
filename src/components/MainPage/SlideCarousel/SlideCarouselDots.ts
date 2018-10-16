import SlideCarousel from './SlideCarousel';

class SlideCarouselDots extends HTMLElement {

    private _parent: SlideCarousel;

    constructor() {
        super();
    }

    // get activeIndex(): number {
    //     const activeDot = this.querySelector('.active-dot') as HTMLSpanElement;
    //     return +activeDot.title - 1;
    // }
    //
    // get slides(): NodeListOf<HTMLDivElement> {
    //     return this.currentCarousel.querySelectorAll('.carousel-items .carousel-item') as NodeListOf<HTMLDivElement>;
    // }

    // get dotsArray(): NodeListOf<HTMLDivElement> {
    //     return this.querySelectorAll('[data-carousel-dot]') as NodeListOf<HTMLDivElement>;
    // }
    //
    // get currentCarousel(): HTMLElement {
    //     return this.parentElement;
    // }

    _onUpdate = () => this.rerender();

    private connectedCallback() {
        this._parent = this.closest(SlideCarousel.is) as SlideCarousel;

        this.rerender();
        this._parent.addEventListener('sc-slidechanged', this._onUpdate);
    }

    private disconnectedCallback() {
        this._parent.removeEventListener('sc-slidechanged', this._onUpdate);
    }

    private rerender() {
        let html = '';
        const count = this._parent.slides.length;
        const activeIndex = this._parent.activeIndex;
        for (let i = 0; i < count; ++i) {
            html += this.buildDot(i, i === activeIndex);
        }
        this.innerHTML = html;
    }

    private buildDot(index:  number, isActive: boolean) {
        return `<button class="dot ${isActive ? 'active' : ''}" data-slide-target="${index}"> </button>`;
    }

    // private drawDots() {
    //     for (let index = 0; index < this.slides.length; index++) {
    //         const dot = document.createElement('span');
    //         dot.className = index === 0 ? "carousel-dot active-dot" : "carousel-dot";
    //         dot.dataset.carouselDot = '';
    //         dot.setAttribute('title', `${index + 1}`);
    //         this.appendChild(dot);
    //     }
    // }
    //
    // private bindEvents() {
    //     // this.clickArrows();
    //     // this.clickDot();
    //     this._parent.addEventListener('sc-slidechanged', this._onUpdate.bind(this));
    // }
    //
    // private clickArrows() {
    //     this.currentCarousel.addEventListener('sc-slidechanged', (event: any) => {
    //         this.hideCurrentDot(event.detail.activeIndex);
    //         this.showNextDot(event.detail.numNextSlide);
    //     }, false);
    // }
    //
    // private clickDot() {
    //     this.addEventListener('click', (event: any) => {
    //         const numNextSlide: number = event.target.title - 1;
    //         if (event.target.title) {
    //             const slideCarousel = new SlideCarousel();
    //             slideCarousel.goToSlide.call(this.currentCarousel, numNextSlide);
    //             this.hideCurrentDot(this.activeIndex);
    //             this.showNextDot(numNextSlide);
    //         }
    //     }, false);
    // }
    //
    // private hideCurrentDot(activeIndex: number) {
    //     this.dotsArray[activeIndex].classList.remove('active-dot');
    // }
    //
    // private showNextDot(numNextSlide: number) {
    //     this.dotsArray[numNextSlide].classList.add('active-dot');
    // }
}

customElements.define('slide-carousel-dots', SlideCarouselDots);

export default SlideCarouselDots;
