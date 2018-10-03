(function () {
    function initCarouselDots() {
        let currentSlide = 0;
        const carousels = document.getElementsByClassName('carousel-wrapper');
        for (let index = 0; index < carousels.length; index++) {
            goToSlide(currentSlide, carousels[index].id, currentSlide);
        }
    }

    function getCurrentSlide(id) {
        const currentCarousel = document.getElementById(`${id}`);
        return currentCarousel.querySelector('.active-dot').title - 1;
    }

    function goToSlide(currentSlide, id, nextSlide) {
        const currentCarousel = document.getElementById(`${id}`);
        const slides = currentCarousel.querySelectorAll('.carousel-items .carousel-item');
        const navDots = currentCarousel.getElementsByClassName('dot');
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
                const target = event.target;
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
                const target = event.target;
                const carouselId = target.closest('.carousel-wrapper').id;
                const currentSlide = getCurrentSlide(carouselId);
                goToSlide(currentSlide, carouselId, currentSlide + 1);
            });
        }
    }

    function clickDot() {
        const dotsArray = document.getElementsByClassName('dots-wrapper');
        for (let index = 0; index < dotsArray.length; index++) {
            dotsArray[index].addEventListener('click', (event) => {
                const target = event.target;
                if(target.title) {
                    const carouselId = target.closest('.carousel-wrapper').id;
                    const currentSlide = getCurrentSlide(carouselId);
                    goToSlide(currentSlide, carouselId, target.title - 1);
                }
            });
        }
    }

    initCarouselDots();
    clickPreviousSlide();
    clickNextSlide();
    clickDot();
}());