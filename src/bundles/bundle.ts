import '../components/core/PopupMenu/PopupMenu';
import '../components/core/PopupMenu/PopupTrigger';
import '../components/core/SlideCarousel/SlideCarousel';
import '../components/core/SlideCarousel/SlideCarouselDots';
import '../components/MainPage/LangMenu/DropdownInput';
import '../components/MainPage/LangMenu/DropdownMenu';

import VideoPopup from '../components/MainPage/VideoPopup/VideoPopup';

const COMPONENTS_LIST = [
    VideoPopup
];
COMPONENTS_LIST.forEach((C) => {
    const c = new C();
   // (typeof c.init === 'function') && c.init();
});