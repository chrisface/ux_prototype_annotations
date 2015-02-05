var mongoose = require('mongoose');
var crypto = require('crypto');

var ProjectSchema = new mongoose.Schema({
  name: { type: String, default: '' }
});

var Project = mongoose.model('Project', ProjectSchema);
