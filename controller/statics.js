const User = require('../models/user');

function indexRoute(req, res) {
  User
    .find()
    .exec()
    .then((users) => res.render('homepage', { users }));
}

module.exports = {
  index: indexRoute
};
