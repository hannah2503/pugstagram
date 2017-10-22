//require user database
const User = require('../models/user');

//write a function that renders the registration form
function registrationNew (req , res) {
  res.render('registrations/new');
}

//write a function that creates the new user
function registrationCreate(req, res){
  User
    .create(req.body)
    .then((user) => {
      res.redirect('/');
    })
    .catch((err) => res.status(500).end());
}

// then export the new user
module.exports = {
  new: registrationNew,
  create: registrationCreate
};
