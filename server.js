const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public')); //made a static directory (pubic in this case)
app.use((req, res, next) => { // next exists so you can tell express when your middleware function is done.
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    });
    next();
})

// app.use((req, res, next) => {
//     res.render('maintainence.hbs') 
    
// })


app.get('/', (req, res) => {
    // res.send("<h1>Hello Express!</h1>");
    res.render('home.hbs', {
        welcomeMessage: 'what\'s up bitches',
        pageTitle: 'Home Page 123',
        currentYear: new Date().getFullYear()
    })
});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    })
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
        currentYear: new Date().getFullYear()
    })
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Shit man, this isn't working right!"
    })
})



app.listen(port, () => {
    console.log(`server is up on port ${port}`); // second argument is optional.
});

