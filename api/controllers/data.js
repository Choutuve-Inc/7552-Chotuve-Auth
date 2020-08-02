
var dependencias = require('./dependencias.js');
var mongoose = dependencias.mongoose,
  User = dependencias.User;

var admin = dependencias.admin;
//var firebase = require('./../../firebaseLogin.js')
var firebase = dependencias.firebase;


var provider = dependencias.provider;
  var jwt = dependencias.jwt;


  var keyJWT = dependencias.keyJWT;


exports.exportDataJoin = function exportDataJoin(req,res,nextPageToken) {
  var arrayUsers=[];
  var i =0;
  // List batch of users, 1000 at a time.
  admin.auth().listUsers(1000)
    .then(function(listUsersResult) {
      listUsersResult.users.forEach(function(userRecord) {
        //console.log(userRecord);
        //if(userRecord.password.includes ("mailPass"))
         arrayUsers.push(new Date(userRecord.metadata.creationTime).toDateString());
      });

      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(req,res,listUsersResult.pageToken);
      }else{
      	var dicList=[];
      	result = arrayUsers.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));
		Object.keys(result).forEach(function(key){
			dicList.push({"fecha":key,"cant":result[key]});
			console.log(key);
		});
		
		dicList.sort(function compare(a, b) {
			  if (new Date(a["fecha"]) < new Date(b["fecha"])) {
			    return -1;
			  }
			  if (new Date(a["fecha"]) > new Date(b["fecha"]) ) {
			    return 1;
			  }
			  // a debe ser igual b
			  return 0;
		})

        res.status(200).json(dicList);
      	}
    })
    .catch(function(error) {
      console.log('Error listing users:', error);
      res.status(500).send(error);
    });
}

exports.exportDataLastSeen = function exportDataLastSeen(req,res,nextPageToken) {
  var arrayUsers=[];
  var i =0;
  // List batch of users, 1000 at a time.
  admin.auth().listUsers(1000)
    .then(function(listUsersResult) {
      listUsersResult.users.forEach(function(userRecord) {
        //console.log(userRecord);
        //if(userRecord.password.includes ("mailPass"))
         arrayUsers.push(new Date(userRecord.metadata.lastSignInTime).toDateString());
      });

      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(req,res,listUsersResult.pageToken);
      }else{
      	var dicList=[];
      	result = arrayUsers.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));
		Object.keys(result).forEach(function(key){
			dicList.push({"fecha":key,"cant":result[key]});
			console.log(key);
		});
		
		dicList.sort(function compare(a, b) {
			  if (new Date(a["fecha"]) < new Date(b["fecha"])) {
			    return -1;
			  }
			  if (new Date(a["fecha"]) > new Date(b["fecha"]) ) {
			    return 1;
			  }
			  // a debe ser igual b
			  return 0;
		})

        res.status(200).json(dicList);
      	}
    })
    .catch(function(error) {
      console.log('Error listing users:', error);
      res.status(500).send(error);
    });
}