var mongoose = require('mongoose');
var crypto = require('crypto');

var ProjectSchema = new mongoose.Schema({
  name: { type: String, index: {required: true, unique: true} },
  annotations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Annotation'}]
});

var Project = mongoose.model('Project', ProjectSchema);
