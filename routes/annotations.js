var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Annotation = mongoose.model('Annotation');

/* GET home page. */
router.post('/', function(req, res, next) {

  var annotation = new Annotation(req.body);

  annotation.save(function(error, annotation){
    if (error){
      console.log("Error creating annotation: " + error);

      res.status(400).json({
        success: false
      });
    }
    else{
      console.log("created the annotation: " + req.param("name"));
      res.status(200).json({
        success: true,
        data: annotation
      });
    }
  });
});

module.exports = router;
