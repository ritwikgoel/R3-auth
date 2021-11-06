var express = require('express'),
    path = require('path'),
    app = express();
    console.log(path.join(__dirname, 'signup.html'))

    app.use('/', express.static(path.join(__dirname, '')))
    app.use('/signup', express.static(path.join(__dirname, 'signup.html')))
    app.use('/main', express.static(path.join(__dirname, 'main.html')))

app.listen(8080);