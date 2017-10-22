//require dependencies
const express = require('express');
const morgan = require('morgan');
const router = require('./config/routes');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
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
app.use(bodyParser);

app.use(router);

//listen to port
app.listen(port, () => console.log(`Express is listening on port ${port}`));
