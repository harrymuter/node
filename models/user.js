var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/nodeauth', { useNewUrlParser: true });

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[[a-z]{3}[0-9]{2}[[a-z]{3}?$/.test(v);
            },
            message: props => `${props.value} is not a valid format`
        },
        required: [true, 'Username Required']
    },
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

const User = module.exports = mongoose.model('User', UserSchema);
