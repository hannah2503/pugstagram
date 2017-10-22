const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/wdi_project_2';
mongoose.connect(dbURI, { useMongoClient: true });

const User = require('../models/user');
const Pug = require('../models/pug');

User.collection.drop();
Pug.collection.drop();

User
  .create([{
    name: 'Hannah',
    username: 'Hanarami',
    email: 'h@hannah.com',
    password: 'password',
    passwordConfirmation: 'password'
  },{
    name: 'Xavier',
    username: 'xman',
    email: 'xavier@xman.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created!`);

    return Pug
      .create([{
        pugName: 'Frank',
        pugAge: '2',
        pugDescription: 'Frank likes to eat pork scratchings and dress as batman.'
      },{
        pugName: 'Peggy',
        pugAge: '4',
        pugDescription: 'Peggy is a princess who likes to wear a crown'
      }])
      .then((pugs) => {
        console.log(`${pugs.length} pugs created!`);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        mongoose.connection.close();
      });
  });
