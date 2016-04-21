var mongoose = require("mongoose");

var TaskSchema = new mongoose.Schema({
  title: String,
},{ _id : false })

var ProjectSchema = new mongoose.Schema({
  title:{type: String, unique : true},
  tasks: [TaskSchema]
});

var Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;