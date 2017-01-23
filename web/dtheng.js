var port = process.argv[2];

var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var logger = require('morgan');

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
        title: 'DTHENG',
        ga_id: analyticsId
    }
  );
});

app.listen(port);

console.log("http://localhost:"+ port +"/");
