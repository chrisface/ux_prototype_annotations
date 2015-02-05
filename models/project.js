var mongoose = require('mongoose');
var crypto = require('crypto');

var ProjectSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  annotations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Annotation'}]
});

var Project = mongoose.model('Project', ProjectSchema);
