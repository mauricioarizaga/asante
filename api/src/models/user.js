const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
 
const userSchema = new Schema({
        email: {
            type: String,
            required: [true, 'Email required'],
            unique: true,
            index: true
        },
        password: {
            type: String,
            required: [true, 'Password required']
        },
    },
    {timestamps: true}
);

userSchema.plugin(uniqueValidator, {message: 'already exist in the DB'});

module.exports = mongoose.model('users', userSchema);