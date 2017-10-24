//require user database
const User = require('../models/user');

//write a function that renders the registration form
function registrationNew (req , res) {
  res.render('registrations/new');
}

//write a function that creates the new user
function registrationCreate(req, res, next){
  User
    .create(req.body)
    .then((user) => {
      req.flash('success', `Thanks for registering, ${user.username}!`);
      req.session.userId = user._id;
      res.redirect('/login');
    })
    .catch((err) => {
      if(err.name === 'ValidationError') {
        req.flash('danger', 'Passwords do not match');
        res.redirect('/register');
      }
      next(err);
    });
}

// then export the new user
module.exports = {
  new: registrationNew,
  create: registrationCreate
};
