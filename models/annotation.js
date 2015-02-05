var mongoose = require('mongoose');
var crypto = require('crypto');

var AnnotationSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  position: {
    x: {type: Number, default: 0},
    y: {type: Number, default: 0}
  }
});

var Annotation = mongoose.model('Annotation', AnnotationSchema);
