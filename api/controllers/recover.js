var dependencias = require('./dependencias.js');
var mongoose = dependencias.mongoose,
  User = dependencias.User,
  Rec = dependencias.Rec;

exports.sendRecMail = function(req, res) {


admin.auth().getUserByEmail(req.body.email)
        .then(function(userRecord) {
          admin.auth().createCustomToken(userRecord.uid)
          .then(function(customToken) {
          	customToken = customToken.substring(0,7);
			var mailOptions = {
			  from: 'titonoolvida1@gmail.com',
			  to: req.body.email,
			  subject: 'Cambie su contraseña con el siguiente codigo',
			  text: customToken
			};
			var new_rec = new Rec({userMail:req.body.email,userToken:customToken.substring(0,7)});
            new_rec.save(function(err, user) {
              if (err){
                res.send(err);
                return
              }
            });

			transporter.sendMail(mailOptions, function(error, info){
			  if (error) {
			    res.status(500).send(error);
			  } else {
			    res.status(200);
			  }
			});
		}
};
