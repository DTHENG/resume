var port = process.argv[2];
var keyPath = process.argv[3];
var certPath = process.argv[4];
var caPath = process.argv[5];
var httpPort = process.argv[5];

var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var logger = require('morgan');
var https = require('https');
var fs = require('fs');

var app = express();

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
  }
));
app.use(express.static(__dirname + '/public'));

var analyticsId = 'UA-18339357-1';

app.get('/', function (req, res) {
  res.render('index', {
        title: 'DTHENG',
        github_link: 'https://github.com/DTHENG',
        angellist_link: 'https://angel.co/daniel-thengvall',
        twitter_link: 'https://twitter.com/DTHENG',
        instagram_link: 'https://instagram.com/dtheng',
        snapcard_link: 'https://snapcard.io',
        rixty_link: 'https://rixty.com',
        wyre_link: 'https://sendwyre.com',
        sf_link: 'https://en.wikipedia.org/wiki/San_Francisco',
        pdf_resume_link: 'https://github.com/DTHENG/resume/raw/master/DanielThengvallResume.pdf',
        ga_id: analyticsId
    }
  );
});

app.get('/resume', function (req, res) {
  res.render('resume', {
        title: 'Resume | DTHENG',
        ga_id: analyticsId
    }
  );
});

if (keyPath) {
    https.createServer({
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
        ca: fs.readFileSync(caPath)
      }, app)
      .listen(port, function () {
        console.log("https://localhost:"+ port +"/");
      });

    // http to https redirect
    var http = express.createServer();
    http.get('*', function(req, res) {
        res.redirect('https://dtheng.com' + req.url);
    })
    http.listen(httpPort);
    console.log("http://localhost:"+ httpPort +"/");

} else {
    app.listen(port);
}