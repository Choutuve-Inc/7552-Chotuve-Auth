'use strict';

module.exports = function(app) {
	var todoList = require('../controllers/todoListController');

	// todoList Routes
	app.route('/login')
		.post(todoList.login);

	app.route('/create')
		.post(todoList.create);

	app.route('/token')
		.post(todoList.validateToken);
		//.put(todoList.update_a_user)
		//.delete(todoList.delete_a_user);
};
