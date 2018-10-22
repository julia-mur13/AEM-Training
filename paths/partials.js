const path = require('path');

const DIR_COMPONENTS = path.join(__dirname, '../src/components/');
const DIR_TEST_PAGES = path.join(__dirname, '../test-pages/pages/');

module.exports.pathsArray = [
    DIR_COMPONENTS + 'MainPage/Post',
    DIR_COMPONENTS + 'core/Header',
    DIR_COMPONENTS + 'core/Footer',
    DIR_COMPONENTS + 'MainPage/SlideCarousel',
    DIR_COMPONENTS + 'MainPage/Main',
    DIR_COMPONENTS + 'FullPost',
    DIR_TEST_PAGES,
];
