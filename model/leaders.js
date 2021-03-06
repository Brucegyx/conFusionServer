const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Schema = mongoose.Schema;

var leaderSchema = new Schema( {
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  abber: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  featured:{
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

var Leader = mongoose.model('Leader', leaderSchema);
module.exports = Leader
