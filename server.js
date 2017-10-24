//require dependencies
const express = require('express');
const { port, dbURI, secret } = require('./config/environment');
const routes = require('./config/routes');

const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');

const session = require('express-session');
const flash = require('express-flash');

const customResponses = require('./lib/customResponses');
const authentication = require('./lib/authentication');
const errorHandler = require('./lib/errorHandler');
const methodOverride = require('./lib/methodOverride');

const app = express();

//set up database
mongoose.connect(dbURI, { useMongoClient: true });

//settings
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

//middleware
app.use(morgan('dev'));
app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride);

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false
}));

app.use(flash());


app.use(customResponses);
app.use(authentication);
app.use(routes);
app.use(errorHandler);

//listen to port
app.listen(port, () => console.log(`Express is listening on port ${port}`));
