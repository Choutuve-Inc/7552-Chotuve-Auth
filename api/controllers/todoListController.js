'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User');

var admin = require('../../server.js');
//var firebase = require('./../../firebaseLogin.js')
var firebase = require('../../firebaseLogin.js');


var provider = new firebase.auth.GoogleAuthProvider();
  

  User.collection.drop();


exports.create = function(req,res) {
  if(req.body.tipo === "mailPass"){
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
      .then(function() {
        res.status(200).json("ok");
      })
      .catch(function(error) {
        res.status(404).json(error.code);
      })
  }
} 



exports.login = function(req,res) {
  if(req.body.tipo === "mailPass"){
    if (!req.body.email) return res.status(400).json({error: 'missing email'});
    if (!req.body.password) return res.status(400).json({error: 'missing password'});
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE) // don't persist auth session
    
    .then(function() {
      return firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    })
      .then((user) => { 
        admin.auth().getUserByEmail(req.body.email)
        .then(function(userRecord) {
          admin.auth().createCustomToken(userRecord.uid)
          .then(function(customToken) {
            firebase.auth().signOut();
            var new_user = new User({userMail:req.body.email,userToken:customToken,tokenDate: new Date(),status:"loged"});
            new_user.save(function(err, user) {
              if (err)
                res.send(err);
              res.json(customToken);
            });
          })
          .catch(function(error) {

            firebase.auth().signOut();
            res.status(404).json(error.code);
          });
        })
        .catch(function(error) {
    
          firebase.auth().signOut();
          res.status(404).json(error.code);
        })
        .catch(function(error) {  
          firebase.auth().signOut();
          res.status(404).json(error.code);
        });
      })
      .catch(function(error) {
        firebase.auth().signOut();
        res.status(404).json(error.code);
      });

  }
}



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
        res.status(200).json("not found");
        return;
      }
      if(user.status[0] === "loged")
        res.json("ok");
      else
        res.json("not singed in");
    });
  }
}

exports.list_all_users = function(req, res) {
  User.find({}, function(err, users) {
    if (err)
      res.send(err);
    res.json(users);
  });
};



exports.update_a_user = function(req, res) {
  User.findOneAndUpdate({_id:req.params.userId}, req.body, {new: true}, function(err, user) {

    if (err){
      if (err.name === "CastError"){
         return res.status(404).json({ error: "No Profile Found" });
      }else {
        res.send(err);
      }
    }else{
      res.json(user);
    }
  });
};
exports.delete_a_user = function(req, res) {

  User.remove({
    _id: req.params.userId
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};
