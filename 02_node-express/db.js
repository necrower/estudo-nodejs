var uri = 'mongodb://localhost:27017/test';

var _ = require('lodash')
var mongoose = require('mongoose')
mongoose.connect(uri)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
  console.log('db connected')
})

var userSchema = mongoose.Schema({
  username: String,
  gender: String,
  name: {
    title: String,
    first: String,
    last: String
  },
  location: {
    street: String,
    city: String,
    state: String,
    zip: Number
  }
})

userSchema.virtual('name.full').get(function(){
    return _.startCase(this.name.first + ' ' + this.name.last);
});

exports.User = mongoose.model('User', userSchema)

/*

var MongoClient = require('mongodb').MongoClient;

var findUsers = function(db, callback) {
    var cursor = db.collection('users').find()
    cursor.each(function(err,doc){
        if (doc != null) {
            console.log(doc);
        } else {
            callback();
        }
    })
}


MongoClient.connect(uri, function functionName(err, db) {
    findUsers(db, function(){
        db.close();
    })
})

*/
