var Todo = require('../models/todo.model');
var TodoController = require('../controllers/todo.controller')(Todo);

module.exports = function(app){

	app.get('/api/todos', TodoController.GetTodo);

	app.post('/api/todos', TodoController.PostTodo);

	app.put('/api/todos/:todo_id', TodoController.UpdateTodo);

	app.delete('/api/todos/:todo_id', TodoController.DeleteTodo);

}
