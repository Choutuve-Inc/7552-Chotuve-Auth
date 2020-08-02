var dependencias = require('./dependencias.js');
var mongoose = dependencias.mongoose,
  User = dependencias.User;

var admin = dependencias.admin;
//var firebase = require('./../../firebaseLogin.js')
var firebase = dependencias.firebase;


var provider = dependencias.provider;
  var jwt = dependencias.jwt;


  var keyJWT = dependencias.keyJWT;



exports.logout = function(req, res) {
  if(req.body.email)
    User.findOneAndRemove({
     userMail:req.body.email
    }, function(err, user) {
      if (err)
        res.status(404).send(err);
      res.status(204).json({ message: 'User successfully deleted' });
    });
  else
    User.findOneAndRemove({
     device:req.body.device
    }, function(err, user) {
      if (err)
        res.status(404).send(err);
      res.status(204).json({ message: 'User successfully deleted' });
    });
};

