(function () {
    const next = document.querySelector('.arrow-next-slide');
    console.log(next, 3);

    next.onclick = () => {
        goToSlide(currentSlide + 1);
    };

    let slides = document.querySelectorAll('.carousel-items .carousel-item');

    let currentSlide = 0;
    goToSlide(1);
    // var slideInterval = setInterval(nextSlide, 2000);

    function goToSlide(n) {
        slides[currentSlide].className = 'carousel-item';
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].className = 'carousel-item showing';
    }

    const previous = document.querySelector('.arrow-previous-slide');

    previous.onclick = function () {
        goToSlide(currentSlide - 1);
    };
}());