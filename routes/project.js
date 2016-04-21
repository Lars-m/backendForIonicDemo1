var express = require("express");
var router = express.Router();
var Project = require("mongoose").model("Project");
var cors = require("cors");

//router.all("/projects",cors(),function(req,res,next){
//  next();
//})

router.all("/projects",cors(),function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header['Access-Control-Allow-Methods'] = 'GET,HEAD,PUT,PATCH,POST,DELETE'
  res.header['Access-Control-Allow-Headers']  = ' Content-Type, Accept';
  next();
})

router.get("/projects", function (req, res) {

  Project.find({},{__v: 0,_id: 0},function(err,projects){
    if(err){
      res.status(500);
      return res.json({code: 500, msg : "Could not fetch projects"})
    }
    res.json(projects);
  })
})


router.post("/projects", function (req, res) {
  var project = req.body;
  var p = new Project(project);
  p.save(function(err){
    if(err){
      res.status(500);
      return res.json({err: {code: 500, msg : "Could not create project"}});
    }
    var asObject = p.toObject();
    delete asObject.__v; //Remove version number
    delete asObject._id; //Remove version number
    console.log(asObject);
    res.json(asObject);
  });
});


router.put("/projects", function (req, res) {
  var project = req.body;
  var id = project._id;
  delete project._id;
  //Project.findByIdAndUpdate(id,project,{new: true},function(err,updated){
  //  if(err){
  //    console.log(err);
  //    res.status(500);
  //    return res.json({err: {code: 500, msg : "Could not Edit project"+err}});
  //  }
  //  console.log("UPDATED");
  //  res.json(updated);
  //})
  Project.findOneAndUpdate({title: project.title},project,{new: true},function(err,updated){
    if(err){
      console.log(err);
      res.status(500);
      return res.json({err: {code: 500, msg : "Could not Edit project"+err}});
    }
    console.log("UPDATED");
    res.json(updated);
  })

});

module.exports = router;