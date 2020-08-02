
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
  
function listAllUsers(req,res,nextPageToken) {

  var arrayUsers=[];
  var i =0;
  // List batch of users, 1000 at a time.
  admin.auth().listUsers(1000, nextPageToken)
    .then(function(listUsersResult) {
      listUsersResult.users.forEach(function(userRecord) {
        //console.log(userRecord);
        //if(userRecord.password.includes ("mailPass"))
         arrayUsers.push(userRecord);
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(req,res,listUsersResult.pageToken);
      }else
        res.status(200).json(arrayUsers);
    })
    .catch(function(error) {
      console.log('Error listing users:', error);
      res.status(500).send(error);
    });
  
  }


exports.list_all_users = function(req, res) {

// Start listing users from the beginning, 1000 at a time.
  let list = req.query.list;
  if(list){
    listListUsers(req,res,list)
    return
  }else{
    listAllUsers(req,res);  
  }
};


function listListUsers(req,res,list,nextPageToken) {

  var arrayUsers=[];
  var i =0;
  // List batch of users, 1000 at a time.
  admin.auth().listUsers(1000, nextPageToken)
    .then(function(listUsersResult) {
      listUsersResult.users.forEach(function(userRecord) {
        //console.log(userRecord);
        //if(userRecord.password.includes ("mailPass"))
        if(list.includes(userRecord.uid))
         arrayUsers.push(userRecord);
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(req,res,list,listUsersResult.pageToken);
      }else
        res.status(200).json(arrayUsers);
    })
    .catch(function(error) {
      console.log('Error listing users:', error);
      res.status(500).send(error);
    });

}

exports.getUserDB = function(req, res) {
  
  admin.auth().getUser(req.params.id)
        .then(function(userRecord) {
        res.json(userRecord);
      }).catch(function(error){
        console.log(error)
        res.status(500)
      });
  
};


 
var controlarCustomeTokenHeader = function(req,res) {
    const token = req.headers['access-token']; 
    if (token) {
      try {
            var decoded = jwt.verify(token, keyJWT);
          } catch(err) {
              res.send("token invalido")    
          }
    } else {
        res.send("falta token");
    }
}




exports.update_a_user = function(req, res) {

  var uid;
  var oldUpdate;
  var oldFilter;    
  admin.auth().getUser(req.params.id)
    .then(function(userRecord) {
       
      uid = userRecord.uid
      
      var email;
      if(req.body.Nemail){
        email = req.body.Nemail;
      }else{
        email = userRecord.email;
      }

      const filter = {userMail:userRecord.email};
      const update = {  userMail:email };

      // `doc` is the document _before_ `update` was applied
      User.findOneAndUpdate(filter, update,
        function(err,user){
            if(err){
              res.status(500).json(err.code);
              return
            }
            if (!user||(typeof user !== 'undefined' && user.length > 0)) {
              res.status(404).json("not loged in");
              return
            }
          oldUpdate = {userMail: user.userMail};
          oldFilter = {userMail:email};
          

          var phone;
          if(req.body.Nphone){
            phone = req.body.Nphone;
          }else{
            phone = userRecord.phoneNumber;
          }

          var photoURL;
          if(req.body.Nimage){
            photoURL = req.body.Nimage;
          }else{
            photoURL = userRecord.photoURL;
          }

          var displayName;
          if(req.body.Nusername){
            displayName = req.body.Nusername;
          }else{
            displayName = userRecord.displayName;
          }



         
          admin.auth().updateUser(uid, {
          email: email,
          phoneNumber: phone,
          photoURL:photoURL,
          displayName: displayName
          })
          .then(function(userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            
              return res.json(userRecord);
          })    
           .catch(function(error) {
              User.findOneAndUpdate(oldFilter, oldUpdate,function(err,user){})
              console.log(error.code)
              if(error.code =="auth/invalid-phone-number" ){
                return res.status(406).json( error.code );
                return
              }
              if(error.code =="auth/phone-number-already-exists" ){
                return res.status(409).json( error.code );
                return
              }
              if(error.code =="auth/email-already-exists" ){
                return res.status(409).json( error.code );
                return
              }
              if(error.code =="auth/invalid-email" ){
                return res.status(406).json( error.code );
                return
              }
              

              return res.status(500).json( error.code );
          });
           
           


        });  
      })
      .catch(function(error) {
            User.findOneAndUpdate(oldFilter, oldUpdate,function(err,user){})
            console.log(error.code)


            return res.status(500).json( error.code );
        });
      
};
/*


*/

exports.delete_user = function(req,res){

  var email;

  admin.auth().getUser(req.params.id)
    .then(function(userRecord) {
      email = userRecord.email;

  }).catch(function(error) {
        if(error.code =="auth/user-not-found" ){
          res.status(404).json( "user no existe" );
          return
        }
        console.log("error primer");
        console.log(error);
        res.status(500).send(error);
        return
    });

admin.auth().deleteUser(req.params.id)
      .then(async function(deleteUsersResult) {


        const filter = {userMail: email};
        await User.deleteMany(filter);    
        await Rec.deleteMany(filter);    
        console.log("sendeo");
        res.status(200).send("ok");
      })
      .catch(function(error) {
        if(error.code =="auth/user-not-found" ){
          res.status(404).json( "user no existe" );
          return
        }

        console.log("error seg");
        console.log(error);

        res.status(500).send(error);
        return;
      });



}