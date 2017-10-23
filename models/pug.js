const mongoose = require('mongoose');

const pugSchema = new mongoose.Schema({
  pugImages: { type: String },
  pugName: String,
  pugAge: String,
  costumes: String,
  pugDescription: String
  // pugId: { type: mongoose.Schema.ObjectId, ref: 'Pug', required: true},
  // createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

// pugSchema.methods.belongsTo = function belongsTo(user) {
//   if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
//   return user.id === this.createdBy.toString();
// };

module.exports = mongoose.model('Pug', pugSchema);
