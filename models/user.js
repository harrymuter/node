var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
mongoose.connect('mongodb://206.189.126.181:27017/nodeauth', { useNewUrlParser: true });

    const UserSchema = mongoose.Schema({
        username: String,
        password: String,
        email: String,
        supervisor: String,
        admin: Boolean,
        fname: String,
        lname: String,
        known_as: String,
        school: String,
        type_of_user: String,
        memorable_word: String,
        memorable_word_answer: String,
        visited: Boolean
    });

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            bcrypt.hash(newUser.memorable_word_answer, salt, function (err, hash) {
                newUser.memorable_word_answer = hash;
            newUser.email = newUser.username+"@uea.ac.uk";
            newUser.admin = false;
            newUser.visited = false;
            newUser.save(callback);
        })});
    });
};
