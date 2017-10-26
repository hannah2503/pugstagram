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
    username: 'Hannah',
    email: 'h@h.com',
    password: 'password',
    passwordConfirmation: 'password'
  },{
    name: 'Xavier',
    username: 'Xavier',
    email: 'xavier@xman.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(users);
    console.log(`${users.length} users created!`);

    return Pug
      .create([{
        pugImages: 'http://www.thepugdiary.com/wp-content/uploads/The_Batman_Pug_on_The_Pug_Diary_Feature.jpg',
        pugName: 'Frank',
        pugAge: '2',
        costumes: 'Superhero',
        pugDescription: 'Frank likes to eat pork scratchings and dress as batman.',
        createdBy: users[0]
      },{
        pugImages: 'https://i.pinimg.com/736x/46/13/27/46132796c0a17810fba066c75e703482--pug-dogs-doggies.jpg',
        pugName: 'Peggy',
        pugAge: '4',
        costumes: 'Princess',
        pugDescription: 'Peggy is a princess who likes to wear a crown',
        createdBy: users[0]
      },{
        pugImages: 'http://data.whicdn.com/images/78391390/large.jpg',
        pugName: 'Snoop',
        pugAge: '3',
        costumes: 'Music',
        pugDescription: 'He likes tasty treats and tasty beats',
        createdBy: users[0]
      }, {
        pugImages: 'http://i.telegraph.co.uk/multimedia/archive/03496/Pug-sweetTooth2_3496753k.jpg',
        pugName: 'Doug',
        pugAge: '2',
        costumes: 'Food',
        pugDescription: 'Doug can\'t get enough of donuts!',
        createdBy: users[0]
      }, {
        pugImages: 'https://i.pinimg.com/736x/0c/17/d7/0c17d799ed71f17509666d6788d42a24--pug-halloween-costumes-dog-costumes.jpg',
        pugName: 'Leo',
        pugAge: '1',
        costumes: 'Animal',
        pugDescription: 'Leo likes to let out his wild-side when he is out with his family',
        createdBy: users[0]
      }])
      .then((pugs) => {
        console.log(pugs);
        console.log(`${pugs.length} pugs created!`);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        mongoose.connection.close();
      });
  });
