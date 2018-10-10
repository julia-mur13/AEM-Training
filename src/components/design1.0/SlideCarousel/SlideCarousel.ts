class SlideCarousel extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.clickDot();
        this.clickPreviousSlide();
        this.clickNextSlide();
    }

    get currentSlide(): number {
        const activeDot = this.querySelector('.active-dot') as HTMLDivElement;
        return +activeDot.title - 1;
    }

    set currentSlide(numSlide: number) {
        this.slides[numSlide].classList.add('showing');
        this.navDots[numSlide].classList.add('active-dot');
    }

    get slides(): NodeListOf<HTMLDivElement> {
        return this.querySelectorAll('.carousel-items .carousel-item') as NodeListOf<HTMLDivElement>;
    }

    get navDots(): NodeListOf<HTMLSpanElement> {
        return this.getElementsByClassName('carousel-dot')  as NodeListOf<HTMLSpanElement>;
    }


    cleanCurrentSlide() {
        this.slides[this.currentSlide].classList.remove('showing');
        this.navDots[this.currentSlide].classList.remove('active-dot');
    }

    getNewCurrentSlide(buttonName: string, prevCurrentSlide: number, dotNextSlide: string): number {
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

    goToSlide(buttonName: string, event: any) {
        const target = event.target as HTMLButtonElement;
        const prevCurrentSlide: number = this.currentSlide;
        if(target.title !== (prevCurrentSlide + 1).toString()) {
            this.cleanCurrentSlide();
            this.currentSlide = this.getNewCurrentSlide(buttonName, prevCurrentSlide, target.title);
        }
    }

    clickPreviousSlide() {
        const previousArrows = document.getElementsByClassName('arrow-previous-btn');
        for (let index = 0; index < previousArrows.length; index++) {
            previousArrows[index].addEventListener('click', (event) => {
                this.goToSlide('PREVIOUS', event);
            });
        }
    }

    clickNextSlide() {
        const nextArrows = document.getElementsByClassName('arrow-next-btn');
        for (let index = 0; index < nextArrows.length; index++) {
            nextArrows[index].addEventListener('click', (event) => {
                this.goToSlide('NEXT', event);
            });
        }
    }

    clickDot() {
        const dotsArray = this.getElementsByClassName('carousel-dots-wrapper');
        for (let index = 0; index < dotsArray.length; index++) {
            dotsArray[index].addEventListener('click', (event) => {
                this.goToSlide('DOT', event);
            });
        }
    }
}

customElements.define('slide-carousel', SlideCarousel);

export default SlideCarousel;