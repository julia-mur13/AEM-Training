import SlideCarousel from './SlideCarousel';

class SlideCarouselDots extends HTMLElement {

    constructor() {
        super();
    }

    get numCurrentSlide(): number {
        const activeDot = this.querySelector('.active-dot') as HTMLSpanElement;
        return +activeDot.title - 1;
    }

    get slides(): NodeListOf<HTMLDivElement> {
        return this.currentCarousel.querySelectorAll('.carousel-items .carousel-item') as NodeListOf<HTMLDivElement>;
    }

    get dotsArray(): NodeListOf<HTMLDivElement> {
        return this.querySelectorAll('[data-carousel-dot]') as NodeListOf<HTMLDivElement>;
    }

    get currentCarousel(): HTMLElement {
        return this.parentElement;
    }

    public drawDots() {
        for (let index = 0; index < this.slides.length; index++) {
            const dot = document.createElement('span');
            dot.className = index === 0 ? "carousel-dot active-dot" : "carousel-dot";
            dot.dataset.carouselDot = '';
            dot.setAttribute('title', `${index + 1}`);
            this.appendChild(dot);
        }
    }

    public bindEvents() {
        this.clickArrows();
        this.clickDot();
    }

    public clickArrows() {
        this.currentCarousel.addEventListener('sc-slidechanged', (event: any) => {
            this.hideCurrentDot(event.detail.numCurrentSlide);
            this.showNextDot(event.detail.numNextSlide);
        }, false);
    }

    public clickDot() {
        this.addEventListener('click', (event: any) => {
            const numNextSlide: number = event.target.title - 1;
            if (event.target.title) {
                const slideCarousel = new SlideCarousel();
                slideCarousel.goToSlide.call(this.currentCarousel, numNextSlide);
                this.hideCurrentDot(this.numCurrentSlide);
                this.showNextDot(numNextSlide);
            }
        }, false);
    }

    public hideCurrentDot(numCurrentSlide: number) {
        this.dotsArray[numCurrentSlide].classList.remove('active-dot');
    }

    public showNextDot(numNextSlide: number) {
        this.dotsArray[numNextSlide].classList.add('active-dot');
    }

    private connectedCallback() {
        this.drawDots();
        this.bindEvents();
    }
}

customElements.define('slide-carousel-dots', SlideCarouselDots);

export default SlideCarouselDots;
