class ShareService {

    initializationPromise: Promise<any> = null;

    requestAddthis() {
        this.initializationPromise = new Promise((resolve, reject) => {
            if (window.addthis) {
                window.addthhis.init();
                window.addthis.addEventListener('addthis.ready', () => resolve(window.addthis));
                setTimeout(() => resolve(window.addthis), 3000);
            }
        })
    }

}