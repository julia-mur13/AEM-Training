import '../components/core/popup-menu/popup-menu';
import '../components/core/popup-menu/popup-trigger';
import '../components/core/slide-carousel/slide-carousel';
import '../components/core/slide-carousel/slide-carousel-dots';
import '../components/core/dropdown-menu/dropdown-input';
import '../components/core/dropdown-menu/dropdown-menu';

// import VideoOverlay from '../components/main-page/video-overlay/video-overlay';
import VideoTrigger from '../components/main-page/video-overlay/video-trigger';


const COMPONENTS_LIST = [
    VideoTrigger
];

COMPONENTS_LIST.forEach((Component) => {
    const component = new Component();
   // (typeof component.init === 'function') && component.init();
    component.init();
});