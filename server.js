// Import JS libraries installed with npm
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
//var babel = require("babel");
var react = require("react");

// Initialize express web server
var app = express();

// Sets up port for express web server
var port = 3000;//process.env.PORT || 3000; // process.env.PORT used to determine right port for Heroku deployment
app.set('port', port);
// Imports the mongoose schema
Yogaposes = require('./models/yogaposes');

// Configures express server with body parser library
app.use(bodyParser.json({type:"application/json"}));
app.use(bodyParser.urlencoded({extended:true}));

// Serve up on ./public folder
app.use(express.static('public'));

// Connect to MLab MongoDB via mongoose
var promise = mongoose.connect('mongodb://admin:admin@ds121225.mlab.com:21225/yogaposes', {
  useMongoClient: true, 
});


// Is this doing anything? 
//var db = mongoose.connection;

app.get('/', function(req, res){
  res.send('Please use /api/yogaposes');
});

// API Calls

//Add some of the yogaposes.js mongoose calls here
//Get all yogaposes
app.get('/api/yogaposes', function(req, res){
  Yogaposes.getYogaposes(function(err, yogaposes){
    if(err){
      next(err);
    } else {
    res.json(yogaposes);
    }
  });
});

//Get 1 yogapose from all poses
app.get('/api/yogaposes/:_id', function(req, res){
  Yogaposes.getYogaposeById(req.params._id, function(err, yogapose){
    if(err){
      next(err);
    } else {
    res.json(yogapose);
    }
  });
});

//Added new yoga pose - Fish Pose, must add data in Postman
app.post('/api/yogaposes', function(req, res, next){
  var yogapose = req.body;
  Yogaposes.addYogapose(yogapose, function(err, yogapose){
    if(err){
      next(err);
    } else {
      res.json(yogapose);
    }
  });
});

//Update one yogapose
app.put('/api/yogaposes/:_id', function(req, res, next){
  var id = req.params._id;
  var yogapose = req.body;
  Yogaposes.updateYogapose(id, yogapose, {returnNewDocument: true}, function(err, yogapose){
    if(err){
      next(err);
    } else {
      res.json(yogapose);
    }
  });
});

//Delete one yogapose
app.delete('/api/yogaposes/:_id', function(req, res){
  var id = req.params._id;
  Yogaposes.removeYogapose(id, function(err, yogapose){
    if(err){
      next(err);
    } else {
    res.json(yogapose);
    }
  });
});

// Start express web server on port 3000
app.listen(app.get('port'), function() {
  console.log('Web Server started on port ' + app.get('port'));
});