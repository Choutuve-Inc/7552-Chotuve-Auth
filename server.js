var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
console.log(`uri es ${process.env.MONGODB_URI || 'mongodb://mongo:27017'} times easier!`);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017');



var admin = require("firebase-admin");

var serviceAccount = require("./melodic-scarab-243900-firebase-adminsdk-c6niu-fa26458a02.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://melodic-scarab-243900.firebaseio.com"
});

module.exports = admin;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/todoListRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);






