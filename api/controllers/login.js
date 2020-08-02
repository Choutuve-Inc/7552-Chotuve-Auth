var dependencias = require('./dependencias.js');
var mongoose = dependencias.mongoose,
  User = dependencias.User;

var admin = dependencias.admin;
//var firebase = require('./../../firebaseLogin.js')
var firebase = dependencias.firebase;


var provider = dependencias.provider;
  var jwt = dependencias.jwt;


  var keyJWT = dependencias.keyJWT;

function logAdmin(req,res){
	if (!req.body.email) return res.status(400).json({error: 'missing email'});
    if (!req.body.password) return res.status(400).json({error: 'missing password'});
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE) // don't persist auth session
    
    .then(function() {
      return firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password+"admin")
    })
      .then((user) => { 
        admin.auth().getUserByEmail(req.body.email)
        .then(function(userRecord) {
          admin.auth().createCustomToken(userRecord.uid)
          .then(function(customToken) {
            firebase.auth().signOut();
            var new_user = new User({userMail:req.body.email.toLowerCase(),userToken:customToken,userType:"admin",tokenDate: new Date(),status:"loged",device:"no"});
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

function logMailPass(req,res){
	if (!req.body.email) return res.status(400).json({error: 'missing email'});
    if (!req.body.password) return res.status(400).json({error: 'missing password'});
    if (!req.body.device) return res.status(400).json({error: 'missing device'});
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE) // don't persist auth session
    
    .then(function() {
      return firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password+"mailPass")
    })
      .then((user) => { 
        admin.auth().getUserByEmail(req.body.email)
        .then(function(userRecord) {
          admin.auth().createCustomToken(userRecord.uid)
          .then( function(customToken) {
            firebase.auth().signOut();
            var new_user = new User({userMail:req.body.email.toLowerCase(),userToken:customToken,userType:"mailPass",tokenDate: new Date(),status:"loged",device: req.body.device });
            new_user.save( function(err, user) {
              if (err)
                res.status(404).send(err);
              else{
              

                res.json({token:customToken,uid:userRecord.uid});
              }
              
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


var login = exports.login = function(req,res) {


	User.findOne({device: req.body.device},
	function(err,user){
      if (err){
        res.send(err.name);
        return;
      }
      if(!user){		 
      	if(req.body.tipo === "mailPass"){
			logMailPass(req,res);


		  }else if(req.body.tipo === "admin"){
			logAdmin(req,res)    

		  }else
		    res.status(404).send("wrong kind of login");
      }
      else{
      	admin.auth().getUserByEmail(user.userMail)
        	.then(function(userRecord) {
         		
        		res.json({token:user.userToken,uid:userRecord.uid});
    		}).catch(function(error){
    			console.log(error)
    			res.json(error);
    		})
    	}
	});
}