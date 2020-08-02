

exports.mongoose = require('mongoose'),
  exports.User = exports.mongoose.model('User');
  exports.Rec = exports.mongoose.model('Rec');

exports.admin = require('../../server.js');
//var firebase = require('./../../firebaseLogin.js')
exports.firebase = require('../../firebaseLogin.js');


exports.provider = new exports.firebase.auth.GoogleAuthProvider();
exports.jwt = require('jsonwebtoken');

exports.User.collection.drop(function(){});
exports.Rec.collection.drop(function(){});

exports.keyJWT = "claveMestraDeJWT";

exports.nodemailer = require('nodemailer');

exports.transporter = exports.nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'titonoolvida1@gmail.com',
    pass: 'Nolaolvid0'
  }
});
