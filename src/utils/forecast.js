// Packages
const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c7f7ad89b7052f21b2f2c5fa978158d1&query=' + longitude + ',' + latitude;
    request({ url, json: true }, (error, {body} = {} ) => {
        if (error) {
            callback('Unable to reach the page. Check your internet connection', undefined);
        } else if (body.success == false) {
            callback('Bad Coords! write a good one...', undefined);
        } else {
            const location = body.location;
            const description = body.current;
            console.log(description);
            callback(undefined,  {
                forecast: `The weather is ${description.weather_descriptions[0].toLowerCase()}`,
                location: `${location.name}, ${location.region +', ' +location.country}`,
                address: location.name,
                temperature: description.temperature
            });
        }
    });
}

module.exports = forecast;