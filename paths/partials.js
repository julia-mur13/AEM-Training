const path = require('path');

const DIR_COMPONENTS = path.join(__dirname, '../src/components/');
const DIR_CORE = path.join(DIR_COMPONENTS, './core/');
const DIR_TEST_PAGES = path.join(__dirname, '../test-pages/pages/');

module.exports.pathsArray = [
    DIR_COMPONENTS + 'main-page/post',
    DIR_COMPONENTS + 'main-page/dynamic-card',
    DIR_COMPONENTS + 'main-page/main',
    DIR_COMPONENTS + 'main-page/lang-menu',
    DIR_COMPONENTS + 'full-post',
    DIR_CORE + 'header',
    DIR_CORE + 'footer',
    DIR_TEST_PAGES,
];
