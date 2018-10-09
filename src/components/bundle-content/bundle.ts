(function () {
    function getCurrentSlide(currentCarousel: HTMLDivElement): number {
        const activeDot = currentCarousel.querySelector('.active-dot') as HTMLDivElement;
        return +activeDot.title - 1;
    }

    function cleanCurrentSlide(currentSlide: number, slides: NodeListOf<HTMLDivElement>, navDots: NodeListOf<HTMLSpanElement>) {
        slides[currentSlide].classList.remove('showing');
        navDots[currentSlide].classList.remove('active-dot');
    }

    function getNewCurrentSlide(buttonName: string, currentSlide: number, dotNextSlide: string, slides: NodeListOf<HTMLDivElement>): number {
        let nextSlide: number = 0;
        switch (buttonName) {
            case 'PREVIOUS':
                nextSlide = currentSlide - 1;
                break;
            case 'NEXT':
                nextSlide = currentSlide + 1;
                break;
            case 'DOT':
                if (dotNextSlide) {
                    nextSlide = +dotNextSlide - 1;
                }
                break;
        }
        return (nextSlide + slides.length) % slides.length;
    }

    function showNewCurrentSlide(currentSlide: number, slides: NodeListOf<HTMLDivElement>, navDots: NodeListOf<HTMLSpanElement>) {
        slides[currentSlide].classList.add('showing');
        navDots[currentSlide].classList.add('active-dot');
    }

    function goToSlide(buttonName: string, event: any) {
        const target = event.target as HTMLButtonElement;
        const currentCarousel = target.closest('.carousel-wrapper') as HTMLDivElement;
        let currentSlide: number = getCurrentSlide(currentCarousel);
        const slides: NodeListOf<HTMLDivElement> = currentCarousel.querySelectorAll('.carousel-items .carousel-item') as NodeListOf<HTMLDivElement>;
        const navDots: NodeListOf<HTMLSpanElement> = currentCarousel.getElementsByClassName('carousel-dot')  as NodeListOf<HTMLSpanElement>;
        cleanCurrentSlide(currentSlide, slides, navDots);
        currentSlide = getNewCurrentSlide(buttonName, currentSlide, target.title, slides);
        showNewCurrentSlide(currentSlide, slides, navDots);
    }

    function clickPreviousSlide() {
        const previousArrows = document.getElementsByClassName('arrow-previous-btn');
        for (let index = 0; index < previousArrows.length; index++) {
            previousArrows[index].addEventListener('click', (event) => {
                goToSlide('PREVIOUS', event);
            });
        }
    }

    function clickNextSlide() {
        const nextArrows = document.getElementsByClassName('arrow-next-btn');
        for (let index = 0; index < nextArrows.length; index++) {
            nextArrows[index].addEventListener('click', (event) => {
                goToSlide('NEXT', event);
            });
        }
    }

    function clickDot() {
        const dotsArray = document.getElementsByClassName('carousel-dots-wrapper');
        for (let index = 0; index < dotsArray.length; index++) {
            dotsArray[index].addEventListener('click', (event) => {
                goToSlide('DOT', event);
            });
        }
    }

    clickPreviousSlide();
    clickNextSlide();
    clickDot();
}());