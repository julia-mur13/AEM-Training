class SlideCarousel extends HTMLElement {

    constructor() {
        super();
    }

    private connectedCallback() {
        this.bindEvents();
    }

    get numCurrentSlide(): number {
        const activeDot = this.querySelector('.active-dot') as HTMLDivElement;
        return +activeDot.title - 1;
    }

    get dotsContainer(): HTMLElement {
        return this.getElementsByTagName('slide-carousel-dots')[0]  as HTMLElement;
    }

    get slides(): NodeListOf<HTMLDivElement> {
        return this.querySelectorAll('[data-slide-item]') as NodeListOf<HTMLDivElement>;
    }

    public bindEvents() {
        this.clickArrows();
    }

    public clickArrows() {
        this.addEventListener('click', (event) => {
            if(event.target.dataset.target) {
                const numNextSlide: number = this.getNumNextSlide(event);
                this.goToSlide(numNextSlide);
            }
        });
    }

    public getNumNextSlide(event: any): number {
        let numPrevSlide = this.numCurrentSlide;
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
        return numNextSlide;
    }


    public goToSlide(numNextSlide: number) {
        this.hideCurrentSlide();
        this.showNextSlide(numNextSlide);
        this.triggerSlideChange();
    }

    public hideCurrentSlide() {
        this.slides[this.numCurrentSlide].classList.remove('showing');
        const currentDot = this.dotsContainer.child[this.numCurrentSlide] as HTMLSpanElement;
        console.log(currentDot, 7);
        currentDot.classList.remove('active-dot');
    }

    public showNextSlide(numNextSlide: number) {
        this.slides[numNextSlide].classList.add('showing');
        const currentDot = this.dotsContainer.childNodes[numNextSlide] as HTMLSpanElement;
        currentDot.classList.add('active-dot');
    }

    triggerSlideChange() {
        // const slide = this.currentSlide;
        const event = new CustomEvent('sc-slidechanged', {
            bubbles: true,
            detail: '1'
        });
        this.dispatchEvent(event);
    }
}

customElements.define('slide-carousel', SlideCarousel);

export default SlideCarousel;
