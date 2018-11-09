import '../components/core/popup-menu/popup-menu';
import '../components/core/popup-menu/popup-trigger';
import '../components/core/slide-carousel/slide-carousel';
import '../components/core/slide-carousel/slide-carousel-dots';
import '../components/core/dropdown-menu/dropdown-input';
import '../components/core/dropdown-menu/dropdown-menu';

import VideoPopup from '../components/main-page/video-overlay/video-overlay';

const COMPONENTS_LIST = [
    VideoPopup
];
COMPONENTS_LIST.forEach((C) => {
    const c = new C();
   // (typeof c.init === 'function') && c.init();
});