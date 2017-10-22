const mongoose = require('mongoose');

const pugSchema = new mongoose.Schema({
  pugName: String,
  pugAge: String,
  pugDescription: String
});

module.exports = mongoose.model('Pug', pugSchema);
