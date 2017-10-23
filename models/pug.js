const mongoose = require('mongoose');

const pugSchema = new mongoose.Schema({
  pugImages: [{ type: String }],
  pugName: String,
  pugAge: String,
  costumes: String,
  pugDescription: String
  // createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Pug', pugSchema);
