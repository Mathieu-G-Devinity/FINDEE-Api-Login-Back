const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


// The schemas is used to set the types of the datas that our database is waiting for
const users = new mongoose.Schema({
  email: {
    type: String,
    required: true, // can't be null or empty
    unique: true // have t be unique, is not enough so we are using "unique validator" too
  },
  password: {
    type: String,
    required: true 
  }
});

users.plugin(uniqueValidator);// add more security with checking the email

module.exports = User = mongoose.model('users', users);
