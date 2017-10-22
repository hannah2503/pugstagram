const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  username: {type: String, required: true},
  email: String
});


module.exports = mongoose.model( 'User', userSchema);
