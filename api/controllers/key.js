var dependencias = require('./dependencias.js');
var mongoose = dependencias.mongoose,
  User = dependencias.User,
  Rec = dependencias.Rec;

var admin = dependencias.admin;
//var firebase = require('./../../firebaseLogin.js')
var firebase = dependencias.firebase;


var provider = dependencias.provider;
  var jwt = dependencias.jwt;


  var keyJWT = dependencias.keyJWT;

exports.getKey = function(req, res) {
  

  admin.auth().getUser(req.params.id)
        .then(function(userRecord) {
            admin.auth().createCustomToken(userRecord.uid)
            .then(async function(customToken) {
              
              customToken = customToken.substring(0,7);

              const filter = {userMail:userRecord.email};

              users = await Rec.findOne({filter})
              if(!users){
                 await Rec.create( {userMail:userRecord.email,userToken:customToken.substring(0,7)},
                  async function(err, user) {
                      if (err){
                        res.send(err);
                        return
                      }else{
                        
                      }
                    });
               }else{
                var user = await Rec.findOne(filter)
                customeToken = user.userToken
               }
              res.send(customToken);

          
          })

      }).catch(function(error){
        console.log(error)
        res.status(500)
      });
  
}
  




exports.sendKeyLink = function(req, res) {


  admin.auth().getUserByEmail(req.body.email)
          .then(function(userRecord) {
        if(process.env.MONGODB_URI){
          var actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be whitelisted in the Firebase Console.

            url: 'https://serene-shelf-10674.herokuapp.com/key/'+ userRecord.uid,
            // This must be true.
            handleCodeInApp: true,
          };
        }else{
          var actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be whitelisted in the Firebase Console.

            url: 'http://localhost:3000/key/'+ userRecord.uid,
            // This must be true.
            handleCodeInApp: true,
          };
        }


        firebase.auth().sendSignInLinkToEmail(userRecord.email, actionCodeSettings)
          .then(function() {
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            res.send("enviado")
          })
          .catch(function(error) {
            if(error.code =="auth/user-not-found" ){
              res.status(404).json( error.code );
              return
            }
            res.status(400).send("fallo en enviar mail")
            // Some error occurred, you can inspect the code: error.code
          });




      }).catch(function(error){
        if(error.code =="auth/user-not-found" ){
          res.status(404).json( error.code );
          return
        }
        res.status(500).send(error);
      })
};
