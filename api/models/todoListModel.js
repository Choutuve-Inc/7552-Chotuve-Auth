'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userMail: {
    type: String,
    Required: 'A Username of an User'
  },
  userToken: {
    type: String,
    Required: 'token that validates the user'
  },
  tokenDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['loged', 'unloged']
    }],
    default: ['unloged']
  }
});


module.exports = mongoose.model('User', UserSchema);
