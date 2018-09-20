const express = require('express');
const app = express();
const exphbs = require('express-hbs');
const partials = require('./partials');
const pathsArray = partials.pathsArray;
// hbs.registerPartials('../src/components');

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname);

app.set('view engine', 'html');

app.engine('.html', exphbs.express4({
    partialsDir: pathsArray
}));

app.get('/', function (req, res) {
    // exphbs.registerPartial('Post', '{{Post}}');

    exphbs.registerHelper('page', function () {
        return 'Post';
    });
    res.render('index');
});

app.get('/readmore', function (req, res) {
    // exphbs.registerPartial('Post', '{{Post}}');

    exphbs.registerHelper('page', function () {
        return 'TestComponent';
    });
    res.render('index');
});

app.listen(3030, function () {
    console.log('Example app listening on port 3030!');
});