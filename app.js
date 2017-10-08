var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.use(bodyParser.json());

Yogaposes = require('./models/yogaposes');

//conect to mongoose
mongoose.connect('mongodb://localhost/yogaposes');
var db = mongoose.connection;

app.get('/', function(req, res){
  res.send('Please use /api/yogaposes');
});


//Get all yogaposes
app.get('/api/yogaposes', function(req, res){
  Yogaposes.getYogaposes(function(err, yogaposes){
    if(err){
      throw err;
    }
    res.json(yogaposes);
  });
});

//Get 1 yogapose from all poses
app.get('/api/yogaposes/:_id', function(req, res){
  Yogaposes.getYogaposeById(req.params._id, function(err, yogapose){
    if(err){
      throw err;
    }
    res.json(yogapose);
  });
});

//Added new yoga pose - Fish Pose, must add data in Postman
app.post('/api/yogaposes', function(req, res){
  var yogapose = req.body;
  Yogaposes.addYogapose(yogapose, function(err, yogapose){
    if(err){
      throw err;
    }
    res.json(yogapose);
  });
});

//Update one yogapose
app.put('/api/yogaposes/:_id', function(req, res){
  var id = req.params._id;
  var yogapose = req.body;
  Yogaposes.updateYogapose(id, yogapose, {}, function(err, yogapose){
    if(err){
      throw err;
    }
    res.json(yogapose);
  });
});

//Delete one yogapose
app.delete('/api/yogaposes/:_id', function(req, res){
  var id = req.params._id;
  Yogaposes.removeYogapose(id, function(err, yogapose){
    if(err){
      throw err;
    }
    res.json(yogapose);
  });
});


app.listen(3000);
console.log("Running on port 3000...");