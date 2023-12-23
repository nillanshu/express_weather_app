const path = require('path');
const hbs = require('hbs');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;


// builtin middleware
const staticPath = path.join(__dirname, "../public");
const dpath = path.join(__dirname, "../templates/views");  //for hbs setup
partials_path = path.join(__dirname,'../templates/partials');  //for partials setup

app.set('view engine', 'hbs'); //for hbs setup
app.set('views', dpath); //for hbs setup
hbs.registerPartials(partials_path);  //for partials setup


app.use(express.static(staticPath));

// routing
app.get("", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/weather", (req, res) => {
    res.render("weather");
});

app.get("*", (req, res) => {
    res.render("404error",  {
        errorMsg: 'Oops! Page Not Found',
    });
});

//listening to the request
app.listen(port, () => {
    console.log(`listeining to the port ${port}`);
});

