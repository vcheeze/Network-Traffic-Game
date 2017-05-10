//Set up requirements
var express = require("express");
var logger = require('morgan');
var bodyParser = require('body-parser');
var Request = require('request');

//Create an 'express' object
var app = express();

//Some Middleware - log requests to the terminal console
app.use(logger('dev'));

//Set up the views directory
app.set("views", __dirname + '/views');
//Set EJS as templating language WITH html as an extension
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
//Add connection to the public folder for css & js files
app.use(express.static(__dirname + '/public'));
// Enable json body parsing of application/json
app.use(bodyParser.json());

var port = process.env.PORT || 3000;


/*================== ROUTES ==================*/
// CORS enable routes
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// Landing page route
app.get("/", function(req, res) {
	res.render("index");
});

// Documentation route
app.get("/about", function(req, res) {
	res.render("about");
});

// Documentation route
app.get("/explore", function(req, res) {
	res.render("explore");
});

// Everything else
app.get("*", function(req, res) {
	res.send("This ain't workin' man. Check the URL and try again.");
});
/*============================================*/

// Start the server
app.listen(port);
console.log('Express started on port ' + port);