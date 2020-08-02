
var dependencias = require('./dependencias.js');
var mongoose = dependencias.mongoose,
  User = dependencias.User;

var admin = dependencias.admin;
//var firebase = require('./../../firebaseLogin.js')
var firebase = dependencias.firebase;


var provider = dependencias.provider;
  var jwt = dependencias.jwt;


  var keyJWT = dependencias.keyJWT;

  exports.deletee = function deleteAllUsers(req,res) {
  var arrayUsers={};
  var i =0;
  // List batch of users, 1000 at a time.
  admin.auth().listUsers(1000)
    .then(function(listUsersResult) {
      listUsersResult.users.forEach(function(userRecord) {




		  admin.auth().deleteUser(userRecord.uid)
		  .then(function(deleteUsersResult) {
		    console.log('Successfully deleted ' + deleteUsersResult.successCount + ' users');
		    console.log('Failed to delete ' +  deleteUsersResult.failureCount + ' users');
		    
		  })
		  .catch(function(error) {
		    console.log('Error deleting users:', error);
		    res.send(500);
		    return;
		  });




      });
     
        res.status(204).send(arrayUsers);
    })
    .catch(function(error) {
      console.log('Error listing users:', error);
      res.status(500).send(error);
    });
  
  }
