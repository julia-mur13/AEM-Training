class SlideCarousel extends HTMLElement {
    static get is() {return 'slide-carousel';}

    constructor() {
        super();
    }

    // TODO: activeIndex
    get activeIndex(): number {
        const activeDot = this.querySelector('.active-dot') as HTMLSpanElement;
        return +activeDot.title - 1;
    }

    get slides(): HTMLElement[] {
        const els = this.querySelectorAll('[data-slide-item]') as NodeListOf<HTMLDivElement>;
        return els ? Array.from(els) : [];
    }

    public goToSlide(numNextSlide: number) {
        this.hideCurrentSlide();
        this.showNextSlide(numNextSlide);
    }

    private connectedCallback() {
        this.bindEvents();
    }

    private bindEvents() {
        this.addEventListener('click', (event) => this.onClick(event), false);
    }

    private onClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (target && target.dataset.slideTarget) {
            // TODO: here we want just to delegate all actions to goToSlide method
            // triggerEvent is part of any 'goTO'(change) action
            const numCurrentSlide: number = this.activeIndex;
            const numNextSlide: number = this.getNumNextSlide(event);
            this.goToSlide(numNextSlide);
            this.triggerSlideChange(numCurrentSlide, numNextSlide);
        }
    }

    private getNumNextSlide(event: any): number {
        const numPrevSlide = this.activeIndex;
        let numNextSlide: number = 0;
        switch (event.target.dataset.target) {
            case 'next':
                numNextSlide = numPrevSlide + 1;
                // this.currentSlide++;
                break;
            case 'prev':
                numNextSlide = numPrevSlide - 1;
                break;
            default:
                numNextSlide = numPrevSlide;
        }
        return (numNextSlide + this.slides.length) % this.slides.length;
    }


    private hideCurrentSlide() {
        this.slides[this.activeIndex].classList.remove('active-slide');
    }

    private showNextSlide(numNextSlide: number) {
        this.slides[numNextSlide].classList.add('active-slide');
    }

    private triggerSlideChange(numCurrentSlide: number, numNextSlide: number) {
        const event = new CustomEvent('sc-slidechanged', {
            bubbles: true,
            detail: {
                numCurrentSlide: `${numCurrentSlide}`,
                numNextSlide: `${numNextSlide}`
            }
        });
        this.dispatchEvent(event);
    }
}

customElements.define(SlideCarousel.is, SlideCarousel);

export default SlideCarousel;
