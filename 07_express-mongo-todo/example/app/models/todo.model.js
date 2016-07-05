var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// TODO schema
var TodoSchema = new Schema({
	todo: String,
	completed: { type:Boolean, default: false },
	created_by: { type: Date, default: Date.now }
});

// True since it is a parallel middleware
TodoSchema.pre('save', function(next, done) {
	if(!this.todo){
		next(new Error("Todo should not be null"));
	}
  	next();
});

var TodoModel = mongoose.model('Todo', TodoSchema);

module.exports = TodoModel;
