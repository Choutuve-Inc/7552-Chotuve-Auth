
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

exports.update_a_user = function(req, res) {

  var uid;
  var oldUpdate;
  var oldFilter;


    admin.auth().getUserByEmail(req.body.email)
    .then( async function(userRecord) {

    	
		uid = userRecord.uid;

		const filter = {userMail:req.body.email};
		var email;

		var password;

		if(req.body.Npassword){
		  password = req.body.Npassword+req.body.tipo;
		}else{
		res.status(404).send("missing New password");
		}
		var user = await Rec.findOne(filter)
			if(!user){
			  console.log("1")
			  users = await Rec.find({})
			  console.log(users);
			  res.status(404).json("No se registro un request para el cambio de contraseña");
			  return;
			}

			if(!user.userToken  ) {
			  console.log("2")
			  res.status(500).json("Hubo un error, intente obtener nuevamente un token en su mail");
			  return;
			}
			if((req.body.token != user.userToken)) {
			  console.log("3")
			  console.log(user.userToken);
			  console.log(req.body.token);
			  res.status(404).json("token erroneo");
			  return;
			}

	        admin.auth().updateUser(uid, {
	          password: password
	          })
	          .then(async function(userRecord) {
	            // See the UserRecord reference doc for the contents of userRecord.      


				await User.deleteMany(filter);    
				await Rec.deleteMany(filter);    
				res.status(200).json(userRecord);
				return;
	          })     
	          .catch(function(error) {
	            console.log(error)

	            return res.status(500).json( error.code );
	        });
	      
	           
	      
      })  
      .catch(function(error) {
            console.log(error)              
            if(error.code =="auth/invalid-email" ){
                res.status(406).json( error.code );
                return
              }
              
            return res.status(500).json( error.code );
        });

      
};