import welcome from '../design1.0/Header/Header';
welcome('HELLO');
(function () {
    function getCurrentSlide(id: string) {
        const currentCarousel = document.getElementById(`${id}`);
        const activeDot = currentCarousel.querySelector('.active-dot') as HTMLDivElement;
        return +activeDot.title - 1;
    }

    function goToSlide(currentSlide: number, id: string, nextSlide: number) {
        const currentCarousel = document.getElementById(`${id}`);
        const slides = currentCarousel.querySelectorAll('.carousel-items .carousel-item');
        const navDots = currentCarousel.getElementsByClassName('carousel-dot');
        slides[currentSlide].classList.remove('showing');
        navDots[currentSlide].classList.remove('active-dot');
        currentSlide = (nextSlide + slides.length) % slides.length;
        slides[currentSlide].classList.add('showing');
        navDots[currentSlide].classList.add('active-dot');
    }

    function clickPreviousSlide() {
        const previousArrows = document.getElementsByClassName('arrow-previous-btn');
        for (let index = 0; index < previousArrows.length; index++) {
            previousArrows[index].addEventListener('click', (event) => {
                const target = event.target as HTMLButtonElement;
                const carouselId = target.closest('.carousel-wrapper').id;
                const currentSlide = getCurrentSlide(carouselId);
                goToSlide(currentSlide, carouselId, currentSlide - 1);
            });
        }
    }

    function clickNextSlide() {
        const nextArrows = document.getElementsByClassName('arrow-next-btn');
        for (let index = 0; index < nextArrows.length; index++) {
            nextArrows[index].addEventListener('click', (event) => {
                const target = event.target as HTMLButtonElement;
                const carouselId = target.closest('.carousel-wrapper').id;
                const currentSlide = getCurrentSlide(carouselId);
                goToSlide(currentSlide, carouselId, currentSlide + 1);
            });
        }
    }

    function clickDot() {
        const dotsArray = document.getElementsByClassName('carousel-dots-wrapper');
        for (let index = 0; index < dotsArray.length; index++) {
            dotsArray[index].addEventListener('click', (event) => {
                const target = event.target as HTMLSpanElement;
                if(target.title) {
                    const carouselId = target.closest('.carousel-wrapper').id;
                    const currentSlide = getCurrentSlide(carouselId);
                    goToSlide(currentSlide, carouselId, +target.title - 1);
                }
            });
        }
    }

    clickPreviousSlide();
    clickNextSlide();
    clickDot();
}());