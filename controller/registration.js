//require user database
const User = require('../models/user');
//write a function that renders the registration form

function registrationNew (req , res) {
  res.render('registration/new');
}

//write a function that creates the new user
function registrationCreate(req, res){
  User
    .create(req.body)
    .then((user) => {
      res.redirect('/');
    })
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.status(400).render('registrations/new', { message: 'Passwords do not match' })
      }
      res.status(500).end();
    });
}
// then export the new user
module.exports = {
  new: registrationNew,
  create: registrationCreate
};
