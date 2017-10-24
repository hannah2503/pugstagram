//require dependencies
const express = require('express');
const { port, dbURI, secret } = require('./config/environment');
const router = require('./config/routes');

const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');

const methodOverride = require('method-override');

const session = require('express-session');
const flash = require('express-flash');

const customResponses = require('./lib/customResponses');
const authentication = require('./lib/authentication');
const errorHandler = require('./lib/errorHandler');

const app = express();

//set up database
mongoose.connect(dbURI, { useMongoClient: true });

//settings
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

//middleware
app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false
}));

app.use(flash());
app.use(customResponses);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(authentication);
app.use(router);
app.use(errorHandler);

//listen to port
app.listen(port, () => console.log(`Express is listening on port ${port}`));
