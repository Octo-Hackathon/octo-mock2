var express = require("express");
var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================
	countyController = require('./service/controllers/countyController');

//mongoose.connect('mongodb://localhost:27017/mean-marketplace');

    mongoose.connect('mongodb://127.0.0.1/octo-mock2');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/ui/build'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

app.get('/', function (req, res) {
	
               res.sendFile(__dirname + '/ui/build/index.html');
});  



//REST API
 
 app.get('/api/search', countyController.searchlist);
 app.get('/api/test', countyController.test); 
 

exports.app = app;


app.listen(3000, function() {
               console.log('Mock2 app started on port 3000...');
});
