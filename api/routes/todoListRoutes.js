'use strict';

module.exports = function(app) {
	var todoList = require('../controllers/todoListController');
	var login = require('../controllers/login.js');
	var logout = require('../controllers/logout.js');
	var validate = require('../controllers/validate.js');
	var create = require('../controllers/create.js');
	var user = require('../controllers/user.js');
	var key = require('../controllers/key.js');
	var deletee = require('../controllers/deleteAll.js');
	var data = require('../controllers/data.js');
	var reset = require('../controllers/reset.js');

	// todoList Routes
	app.route('/login')
		.post(login.login)
		.options(login.login);

	app.route('/logout')
		.post(logout.logout);

	app.route('/create')
		.post(create.create);

	app.route('/token')
		.post(validate.validateToken);
		
	app.route('/users')
		.get(user.list_all_users);
		//.delete(deletee.deletee);

	app.route('/users/:id')
		//.post(todoList.generarTokenDeMod)
		.patch(user.update_a_user)
		.delete(user.delete_user)
		.get(user.getUserDB);	

	app.route('/reset')
		.post(reset.update_a_user);

	app.route('/key')
		.post(key.sendKeyLink);
		
	app.route('/key/:id')
		//.post(todoList.generarTokenDeMod)
		.get(key.getKey);

	app.route('/ping')
		.get(function(req,res){res.send("pong")});

	app.route('/data/join')
		.get(data.exportDataJoin);
	app.route('/data/seen')
		.get(data.exportDataLastSeen);
};
