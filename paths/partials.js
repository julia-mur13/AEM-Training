const path = require('path');

const DIR_COMPONENTS = path.join(__dirname, '../src/components/');
const DIR_TEST_PAGES = path.join(__dirname, '../test-pages/pages/');

module.exports.pathsArray = [
    DIR_COMPONENTS + 'design1.0/Post',
    DIR_COMPONENTS + 'design1.0/Header',
    DIR_COMPONENTS + 'design1.0/Footer',
    DIR_COMPONENTS + 'design1.0/Carousel',
    DIR_COMPONENTS + 'exercises/Clock',
    DIR_COMPONENTS + 'exercises/AnimationLayers',
    DIR_TEST_PAGES,
];
