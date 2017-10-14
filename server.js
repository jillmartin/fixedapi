var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var babel = require("babel");

app.use(express.static('public'));
app.use(bodyParser.json({type:"application/json"}));
app.use(bodyParser.urlencoded({extended:true}));

var port = process.env.PORT || 3000;

Yogaposes = require('./models/yogaposes');

//conect to mongoose
mongoose.connect('mongodb://jill:jill13@ds117615.mlab.com:17615/yogaposes');
var db = mongoose.connection;

app.get('/', function(req, res){
  res.send('Please use /api/yogaposes');
});

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

app.listen(port);
console.log("Running on port 3000...");