class SlideCarousel extends HTMLElement {
    static get is() {
        return 'slide-carousel';
    }

    constructor() {
        super();
    }

    private connectedCallback() {
        this.classList.add('slide-carousel');
        this.dataset.firstActiveIndex ? this.activeIndex = +this.dataset.firstActiveIndex - 1 : this.activeIndex = 0;
        this.bindEvents();
    }

    private disconnectedCallback() {
        this.removeEventListener('click', this._onClick, false);
    }

    private bindEvents() {
        this.addEventListener('click', (event) => this._onClick(event), false);
        // this.addEventListener('sc-slideanimation', () => this._onAnimate(), false);
    }

    get activeClass() {
        return this.getAttribute('active-slide-class') || 'active-slide';
    }

    get activeIndex(): number {
        return this.slides.findIndex((el) => el.classList.contains(this.activeClass));
    }

    get animDirection(): string {
        return this.getAttribute('direction');
    }

    private _cleanAnimationClasses() {
        if (this.animDirection) {
            this.slides.forEach((elem) => {
                elem.classList.remove(this.animDirection);
                elem.classList.remove(`prev`);
            })
        }
    }

    set activeIndex(numNextSlide: number) {
        if (this.activeIndex !== -1) {
            this._onAnimate(numNextSlide);
            this.slides[this.activeIndex].classList.remove(this.activeClass);
        }
        numNextSlide = (numNextSlide + this.slides.length) % this.slides.length;
        this.slides[numNextSlide].classList.add(this.activeClass);
        this.triggerSlideChange();
    }

    get slides(): HTMLElement[] {
        const els = this.querySelectorAll('[data-slide-item]') as NodeListOf<HTMLDivElement>;
        return els ? Array.from(els) : [];
    }

    private _onClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (target && target.dataset.slideTarget) {
            this._cleanAnimationClasses();
            this.setActive(target.dataset.slideTarget);
        }
    }

    private _onAnimate(numNextSlide: number) {
        numNextSlide > this.activeIndex ? this.setAttribute('direction', 'left') : this.setAttribute('direction', 'right');
        this.slides[this.activeIndex].classList.add('prev');
        numNextSlide = (numNextSlide + this.slides.length) % this.slides.length;
        this.slides[numNextSlide].classList.add(this.animDirection);
    }

    private setActive(target: number | string) {
        if ('prev' === target) {
            this.setAttribute('direction', 'right');
            this.activeIndex--;
        } else if ('next' === target) {
            this.setAttribute('direction', 'left');
            this.activeIndex++;
        } else {
            this.activeIndex = +target;
        }
    }

    private triggerSlideChange() {
        const event = new CustomEvent('sc-slidechanged', {
            bubbles: true
        });
        this.dispatchEvent(event);
    }
}

customElements.define(SlideCarousel.is, SlideCarousel);

export default SlideCarousel;
