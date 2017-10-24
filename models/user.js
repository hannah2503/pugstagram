const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.ObjectId, ref: 'Pug' }]
});

userSchema
  .virtual('pugs', {
    ref: 'Pug',
    localField: '_id',
    foreignField: 'user'
  });

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'Details do not match');
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.hasFavorited = function hasFavorited(pug) {
  if(!pug) return false;
  return !!this.favorites.find(_pug => pug.id === _pug.id);
};


module.exports = mongoose.model('User', userSchema);
