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
  userType: {
    type: String,
    Required: 'tipo de user'
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
  },
  device: {
    type: String,
    Required: 'device en el que logeo'
  }
 });

var RecSchema = new Schema({
  userMail: {
    type: String
  },
  userToken: {
    type: String
  }
 });


module.exports = mongoose.model('User', UserSchema);
module.exports = mongoose.model('Rec', RecSchema);
