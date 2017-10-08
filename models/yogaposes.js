var mongoose = require("mongoose");

//yogapose schema
var yogaposesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

var Yogaposes = module.exports = mongoose.model("Yogaposes", yogaposesSchema);

//get Yogaposes
module.exports.getYogaposes = function(callback, limit){
  Yogaposes.find(callback).limit(limit);
}

//get 1 Yogapose
module.exports.getYogaposeById = function(id, callback){
  Yogaposes.findById(id, callback);
}

// Add 1 yogapose
module.exports.addYogapose = function(yogapose, callback){
  Yogaposes.create(yogapose, callback);
}

// Update yogapose 
module.exports.updateYogapose = function(id, yogapose, options, callback){
  var query = {_id: id};
  //not sure about all of the key values below
  var update = {
    name: yogapose.name,
    sanskritName: yogapose.sanskritName,
    benefit: yogapose.benefit
  }
  Yogaposes.findOneAndUpdate(query, update, options, callback);
}

//Delete yoga pose
module.exports.removeYogapose = function(id, callback){
  var query = {_id: id};
  Yogaposes.remove(query, callback);
}