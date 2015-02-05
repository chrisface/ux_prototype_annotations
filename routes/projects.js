var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Project = mongoose.model('Project');

/* GET home page. */
router.post('/', function(req, res, next) {

  var project = new Project({
    name: req.param("name")
  });

  project.save(function(error, project){
    if (error){
      console.log("Error creating project: " + error);

      res.status(400).json({
        success: false
      });
    }
    else{
      console.log("created the project: " + req.param("name"));
      res.status(200).json({
        success: true,
        name: req.param("name")
      });
    }
  });
});

module.exports = router;
