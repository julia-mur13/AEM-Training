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

    private connectedCallback() {
        this.drawDots();
        this.bindEvents();
    }

    private drawDots() {
        for (let index = 0; index < this.slides.length; index++) {
            const dot = document.createElement('span');
            dot.className = index === 0 ? "carousel-dot active-dot" : "carousel-dot";
            dot.dataset.carouselDot = '';
            dot.setAttribute('title', `${index + 1}`);
            this.appendChild(dot);
        }
    }

    private bindEvents() {
        this.clickArrows();
        this.clickDot();
    }

    private clickArrows() {
        this.currentCarousel.addEventListener('sc-slidechanged', (event: any) => {
            this.hideCurrentDot(event.detail.numCurrentSlide);
            this.showNextDot(event.detail.numNextSlide);
        }, false);
    }

    private clickDot() {
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

    private hideCurrentDot(numCurrentSlide: number) {
        this.dotsArray[numCurrentSlide].classList.remove('active-dot');
    }

    private showNextDot(numNextSlide: number) {
        this.dotsArray[numNextSlide].classList.add('active-dot');
    }
}

customElements.define('slide-carousel-dots', SlideCarouselDots);

export default SlideCarouselDots;
