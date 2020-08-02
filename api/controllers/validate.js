var dependencias = require('./dependencias.js');
var mongoose = dependencias.mongoose,
  User = dependencias.User;

var admin = dependencias.admin;
//var firebase = require('./../../firebaseLogin.js')
var firebase = dependencias.firebase;


var provider = dependencias.provider;
  var jwt = dependencias.jwt;


  var keyJWT = dependencias.keyJWT;







exports.validateToken = function(req, res) {
  if (!req.body.JWT){
    res.status(404).json("bad request");
  }else{

    User.findOne({userToken: req.body.JWT},
    function(err,user){
      if (err){
        res.send(err.name);
        return;
      }
      if(!user){
        res.status(404).json("not found");
        return;
      }
      if(user.status[0] === "loged")
        res.json(user.userType);
      else
        res.status(404).json("not singed in");
    });
  }
}