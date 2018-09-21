const express = require('express');
const app = express();
const exphbs = require('express-hbs');
const partials = require('./paths/partials');
const pathsArray = partials.pathsArray;

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname);

app.set('view engine', 'html');

app.engine('.html', exphbs.express4({
    partialsDir: pathsArray
}));

app.get('/server.js', function (req, res) {
    exphbs.registerHelper('page', function () {
        return 'Main';
    });
    res.render('index');
});

app.get('/readmore', function (req, res) {
    exphbs.registerHelper('page', function () {
        return 'TestPage';
    });
    res.render('index');
});

app.listen(3030, function () {
    console.log('Example app listening on port 3030!');
});