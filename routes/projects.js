var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Project = mongoose.model('Project');
var Annotation = mongoose.model('Annotation');

// Create a Project
router.post('/', function(req, res, next) {

  var project = new Project(req.body);

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
        data: project
      });
    }
  });
});

router.get('/:projectId', function(req, res, next){
  Project.findById(req.param("projectId"), function(error, project){
    if(error){
      console.log("Error retreiving project: " + error);
      res.status(400).json({
        success: false
      });
    }
    else{
      res.status(200).json(project);
    }
  });
});

// Add an Annotation to Project
router.post('/:projectId/annotations', function(req, res, next) {

  Project.findById(req.param("projectId"), function(error, project){
    if (error){
      console.log("Error creating annotation: " + error);
      res.status(400).json({
        success: false
      });
    }
    else{
      var annotation = new Annotation(req.body);

      annotation.save(function(error, annotation){
        if (error){
          console.log("Error creating annotation: " + error);

          res.status(400).json({
            success: false
          });
        }
        else{
          console.log("created the annotation: " + annotation);

          project.annotations.push(annotation);

          project.save(function(error, project){
            if (error){
              console.log("Error creating annotation: " + error);

              res.status(400).json({
                success: false
              });
            }
            else{
              console.log("Associated annotation with Project: " + error);
              res.status(200).json({
                success: true,
                data: annotation
              });
            }
          });
        }
      });
    }
  })

});

module.exports = router;
