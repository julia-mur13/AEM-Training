import '../../core/PopupMenu/PopupMenu';
import '../../core/PopupMenu/PopupTrigger';
import '../../core/SlideCarousel/SlideCarousel';
import '../../core/SlideCarousel/SlideCarouselDots';
import '../MainPage/LangMenu/DropdownInput';
import '../MainPage/LangMenu/DropdownMenu';

import VideoPopup from '../MainPage/VideoPopup/VideoPopup';

const COMPONENTS_LIST = [
    VideoPopup
];
COMPONENTS_LIST.forEach((C) => {
    const c = new C();
   // (typeof c.init === 'function') && c.init();
});