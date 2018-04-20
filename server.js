const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var anow = new Date().toDateString();
    var log = `${anow}: ${req.method} ${req.url}`;
    console.log();
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to appedn to server.log');
        }
    });
    next();    
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

hbs.registerHelper('goScreamIt', (text) =>{
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'Hello there champ!'
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/projects', (req,res) => {
    res.render('projects.hbs', {
        pageTitle: 'Portfolio Page',
        welcomeMsg: 'Portfolio Page!'
    });
});

app.get('/bad', (req,res,err) =>{
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});