const mongoose = require('mongoose');

const pugSchema = new mongoose.Schema({
  pugImages: { type: String },
  pugName: String,
  pugAge: String,
  costumes: String,
  pugDescription: String,
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

pugSchema.methods.belongsTo = function belongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

pugSchema.methods.isOwnedBy = function isOwnedBy(user) {
  if(!user) return false;
  return !!user.pugs.find(pug => pugs.id === this.id);
};

module.exports = mongoose.model('Pug', pugSchema);
