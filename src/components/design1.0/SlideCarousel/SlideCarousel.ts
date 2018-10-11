class SlideCarousel extends HTMLElement {

    constructor() {
        super();
    }

    set currentSlide(numSlide: number) {
        this.slides[numSlide].classList.add('showing');
        this.navDots[numSlide].classList.add('active-dot');
    }

    get currentSlide(): number {
        const activeDot = this.querySelector('.active-dot') as HTMLDivElement;
        return +activeDot.title - 1;
    }

    get navDots(): NodeListOf<HTMLSpanElement> {
        return this.getElementsByClassName('carousel-dot')  as NodeListOf<HTMLSpanElement>;
    }

    get slides(): NodeListOf<HTMLDivElement> {
        return this.querySelectorAll('.carousel-items .carousel-item') as NodeListOf<HTMLDivElement>;
    }


    public clickDot() {
        const dotsArray = this.getElementsByClassName('carousel-dots-wrapper');
        [].forEach.call(dotsArray, (element: any) => {
            element.addEventListener('click', (event: any) => {
                this.goToSlide('DOT', event);
            });
        });
    }

    public clickPreviousSlide() {
        const previousArrows = this.getElementsByClassName('arrow-previous-btn');
        [].forEach.call(previousArrows, (element: any) => {
            element.addEventListener('click', (event: any) => {
                this.goToSlide('PREVIOUS', event);
            });
        });
    }

    public clickNextSlide() {
        const nextArrow = this.querySelector('.arrow-next-btn');
        nextArrow.addEventListener('click', (event: any) => {
            this.goToSlide('NEXT', event);
        });
    }


    public goToSlide(buttonName: string, event: any) {
        const target = event.target as HTMLButtonElement;
        const prevCurrentSlide: number = this.currentSlide;
        if (target.title !== (prevCurrentSlide + 1).toString()) {
            this.cleanCurrentSlide();
            this.currentSlide = this.getNewCurrentSlide(buttonName, prevCurrentSlide, target.title);
        }
    }

    public cleanCurrentSlide() {
        this.slides[this.currentSlide].classList.remove('showing');
        this.navDots[this.currentSlide].classList.remove('active-dot');
    }

    public getNewCurrentSlide(buttonName: string, prevCurrentSlide: number, dotNextSlide: string): number {
        let nextSlide: number = prevCurrentSlide;
        switch (buttonName) {
            case 'PREVIOUS':
                nextSlide = prevCurrentSlide - 1;
                break;
            case 'NEXT':
                nextSlide = prevCurrentSlide + 1;
                break;
            case 'DOT':
                if (dotNextSlide) {
                    nextSlide = +dotNextSlide - 1;
                }
                break;
            default:
                nextSlide = prevCurrentSlide;
        }
        return (nextSlide + this.slides.length) % this.slides.length;
    }

    private connectedCallback() {
        this.clickDot();
        this.clickPreviousSlide();
        this.clickNextSlide();
    }
}

customElements.define('slide-carousel', SlideCarousel);

export default SlideCarousel;
