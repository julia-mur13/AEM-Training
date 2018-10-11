class SlideCarouselDots extends HTMLElement {

    constructor() {
        super();
    }

    get slides(): NodeListOf<HTMLDivElement> {
        return this.currentCarousel.querySelectorAll('.carousel-items .carousel-item') as NodeListOf<HTMLDivElement>;
    }

    get currentCarousel(): HTMLElement {
        return this.parentElement;
    }

    public drawDots() {
        for (let index = 0; index < this.slides.length; index++) {
            const dot = document.createElement('span');
            dot.className = index === 0 ? "carousel-dot active-dot" : "carousel-dot";
            dot.setAttribute('title', `${index + 1}`);
            this.appendChild(dot);
        }
    }

    private connectedCallback() {
        this.drawDots();
    }
}

customElements.define('slide-carousel-dots', SlideCarouselDots);

export default SlideCarouselDots;
