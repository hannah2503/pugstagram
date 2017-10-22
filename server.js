//require dependencies
const express = require('express');
const morgan = require('morgan');
const router = require('./config/routes');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { port, dbURI } = require('./config/environment');

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

app.use(router);

//listen to port
app.listen(port, () => console.log(`Express is listening on port ${port}`));
