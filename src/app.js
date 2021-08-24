// Core Node modules
const path = require('path'); // path module
// npm modules
const express = require('express');
const hbs = require('hbs');
// built modules
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


// Init express
const app = express(); // returns a object with tons of methods


const indexPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../public/templates/partials');
const viewsPath = path.join(__dirname,'../public/templates/views');
const port = process.env.PORT || 3000;



app.use(express.static(indexPath));
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

/// Get commands
app.get('', (req, res) => {
    res.render('index',{
        title:'Weather App!',
        name:'Victor'
    });
});

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Victor'
    });
})


app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Victor',
        title: 'Help'
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Article not found!',
        name: 'Victor'
    });
})



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided!'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        
        forecast(latitude, longitude, (error, response ) => {
            
            if (error) {
                return res.send({
                    error
                });
            }
            return res.send(response);
        });
    });



})
app.get('/products', (req, res, next) => {
    if (!req.query.search) {
        res.send({error: 'You must provide a searh value and key!'});
        return;
    } 

    res.send({
        products: []
    });
    
});

app.get('*', (req, res) => {
    res.send('404 error');
})


// Start the server
app.listen(port, () => {
    console.log('Server started at port ' + port);
})