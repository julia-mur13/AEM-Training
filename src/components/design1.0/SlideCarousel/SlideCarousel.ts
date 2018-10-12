class SlideCarousel extends HTMLElement {
    constructor() {
        super();
    }


    get numCurrentSlide(): number {
        const activeDot = this.querySelector('.active-dot') as HTMLSpanElement;
        return +activeDot.title - 1;
    }

    get slides(): NodeListOf<HTMLDivElement> {
        return this.querySelectorAll('[data-slide-item]') as NodeListOf<HTMLDivElement>;
    }

    public bindEvents() {
        this.clickArrows();
    }

    public clickArrows() {
        this.addEventListener('click', (event: any) => {
            if (event.target.dataset && event.target.dataset.target) {
                const numCurrentSlide = this.numCurrentSlide;
                const numNextSlide: number = this.getNumNextSlide(event);
                this.goToSlide(numNextSlide);
                this.triggerSlideChange(numCurrentSlide, numNextSlide);
            }
        }, false);
    }

    public getNumNextSlide(event: any): number {
        const numPrevSlide = this.numCurrentSlide;
        let numNextSlide: number = 0;
        switch (event.target.dataset.target) {
            case 'next':
                numNextSlide = numPrevSlide + 1;
                break;
            case 'prev':
                numNextSlide = numPrevSlide - 1;
                break;
            default:
                numNextSlide = numPrevSlide;
        }
        return (numNextSlide + this.slides.length) % this.slides.length;
    }


    public goToSlide(numNextSlide: number) {
        this.hideCurrentSlide();
        this.showNextSlide(numNextSlide);
    }

    public hideCurrentSlide() {
        this.slides[this.numCurrentSlide].classList.remove('showing');
    }

    public showNextSlide(numNextSlide: number) {
        this.slides[numNextSlide].classList.add('showing');
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

    private connectedCallback() {
        this.bindEvents();
    }
}

customElements.define('slide-carousel', SlideCarousel);

export default SlideCarousel;
