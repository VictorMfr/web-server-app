//Request for WeatherStack
const request = require('request');
const weatherStackUrl = 'http://api.weatherstack.com/current?access_key=c7f7ad89b7052f21b2f2c5fa978158d1&query=37.8267,-122.4233';

request({ url: url, json: true }, (error, response) => {
    console.log(`It is currently ${response.body.current.temperature} degrees, but it feels like ${response.body.current.feelslike}. Also, it is ${response.body.current.weather_descriptions[0].toLowerCase()}`);
});