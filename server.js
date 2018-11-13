var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express()

var apiKey = '80c1245dc664673c681da5a0f58cf629';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')


var provincies = {};
app.get ('/', function (req,res){
  res.render('index');
})

app.post('/', function (req, res) {
  var city = req.body.location;
  var lat=city.lat
  var lon=city.lon
  console.log("---",city) //{"lat":-34.614493,"lon":-58.445856}
  var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric` 
  request(url, function (err, response, data) {
    console.log (data)
    if(err){
      res.render('index', {weather: null, error: err, provincies: provincies});
    } else {
      //console.log(data)
      var weather = JSON.parse(data)

      if(weather.cod != 200){
        res.render('index', {weather: null, error: 'Error, please try again', provincies: provincies});
      } else {
        //var w = weather.list[0];
        
        var weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null, provincies: provincies });
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
