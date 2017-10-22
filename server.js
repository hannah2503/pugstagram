//require dependencies
const express = require('express');
const morgan = require('morgan');
const { port, dbURI, secret } = require('./config/environment');
const router = require('./config/routes');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const User = require('./models/user');

const app = express();

//settings
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

//set up database
mongoose.connect(dbURI, { useMongoClient: true });

//middleware
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false
}));
app.use((req, res, next) => {
  console.log(req.session.userId);
  if (!req.session.userId) return next();
  User
    .findById(req.session.userId)
    .exec()
    .then((user) => {
      if(!user) {
        return req.session.regenerate(() => {
          // req.flash('danger', 'You must be logged in.');
          res.redirect('/');
        });
      }
      // Re-assign the session id for good measure
      req.session.userId = user._id;
      res.locals.user = user;
      res.locals.isLoggedIn = true;
      next();
    });
});
app.use(router);

//listen to port
app.listen(port, () => console.log(`Express is listening on port ${port}`));
