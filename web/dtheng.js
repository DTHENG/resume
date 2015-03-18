var express = require('express');
var stylus = require('stylus');
var nib = require('nib');

var app = express()

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.render('index', {
        title: 'DTHENG',
        github_link: 'https://github.com/DTHENG',
        angellist_link: 'https://angel.co/daniel-thengvall',
        twitter_link: 'https://twitter.com/DTHENG',
        instagram_link: 'http://instagram.com/dtheng',
        snapcard_link: 'https://twitter.com/JoinSnapCard',
        rixty_link: 'https://twitter.com/rixty',
        ga_id: 'UA-18339357-1'   
    }
  )
})

app.listen(8077)