const config = {
    rootMargin: '0px 0px 0px 0px',
    threshold: 0
};

let observer = new IntersectionObserver(function(entries, observer) {
    // iterate over each entry
    entries.forEach(entry => {
        // process just the images that are intersecting.
        // isIntersecting is a property exposed by the interface
        if(entry.isIntersecting) {
            // custom function that copies the path to the img
            // from data-src to src
            const target = entry.target as HTMLImageElement;
            target.src = target.dataset.src;
            // the image is now in place, stop watching
            observer.unobserve(entry.target);
        }
    });
}, config);

const imgs = document.querySelectorAll('[data-src]');

imgs.forEach(img => {
    observer.observe(img);
});
