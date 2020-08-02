
var dependencias = require('./dependencias.js');
var mongoose = dependencias.mongoose,
  User = dependencias.User;

var admin = dependencias.admin;
//var firebase = require('./../../firebaseLogin.js')
var firebase = dependencias.firebase;


var provider = dependencias.provider;
  var jwt = dependencias.jwt;


  var keyJWT = dependencias.keyJWT;

exports.create = function(req,res) {
  if(req.body.tipo === "mailPass"){
    var photoURL =  req.body.image;
    admin.auth().createUser({email:req.body.email, password:req.body.password+"mailPass",phoneNumber:req.body.phone,photoURL:photoURL,displayName:req.body.username})
      .then(function() {
        res.status(200).json("ok");
      })
      .catch(function(error) {
        res.status(404).json(error.code);
      })
  }
  if(req.body.tipo === "admin"){
    var photoURL = "https://firebasestorage.googleapis.com/v0/b/chotuve-android-media.appspot.com/o/userPic%2Fdefault_userPic.jpg?alt=media&token=fde26300-a5dc-434f-a5d0-17096e6a7d5a"
    admin.auth().createUser({email:req.body.email, password:req.body.password+"admin",photoURL:photoURL,displayName:"admin"})
      .then(function() {
        res.status(200).json("ok");
      })
      .catch(function(error) {
        res.status(404).json(error.code);
      })
  }
} 

