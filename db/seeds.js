const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/wdi_project_2';
mongoose.connect(dbURL);

const User = require('../models/user');
User.collection.drop();

User
  .create([{
    name: 'Hannah',
    username: 'Hanarami',
    email: 'h@hannah.com'
  },{
    name: 'Xavier',
    username: 'xman',
    email: 'xavier@xman.com'
  }])
  .then((users) => {
    console.log(`${users.length} users created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
