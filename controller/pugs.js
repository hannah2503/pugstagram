const Pug = require('../models/pug');
const costumes = [
  'Food',
  'Seasonal',
  'Superhero',
  'Princess',
  'Animal',
  'Artist',
  'Film',
  'Sports',
  'Cute',
  'Random'
];

function pugsIndex(req, res, next) {
  Pug
    .find()
    .populate('createdBy')
    .exec()
    .then(pugs => res.render('pugs/index', { pugs }))
    .catch(next);
}

function pugsNew(req, res) {
  res.render('pugs/new', {costumes});
}

function pugsShow(req, res, next) {
  Pug
    .findById(req.params.id)
    .populate('createdBy')
    .exec()
    .then(pug => {
      if(!pug) return res.notFound();
      return res.render('pugs/show', { pug });
    })
    .catch(next);
}


function pugsCreate(req, res, next) {
  req.body.createdBy = req.user;
  Pug
    .create(req.body)
    .then(() => res.redirect('/pugs'))
    .catch(next);
}



function pugsEdit(req, res, next) {
  Pug
    .findById(req.params.id)
    .then((pug) => {
      if(!pug) return res.notFound();
      return res.render('pugs/edit', { pug, costumes });
    })
    .catch(next);
}

function pugsUpdate(req, res, next) {
  Pug
    .findById(req.params.id)
    .then(pug => {
      if(!pug) return res.status(404).render('statics/404');

      for(const field in req.body) {
        pug[field] = req.body[field];
      }
      return pug.save();
    })
    .then(pug => res.redirect(`/pugs/${pug.id}`))
    .catch(next);
}

// // This requires the user's favorites to be populated
// function pugsFavorite(req, res, next) {
//   // if the selected pug is not in the user's favorites
//   if(!req.currentUser.favorites.find(pug => pug.id === req.params.id)) {
//     // add the pug id to the user's favorites
//     req.currentUser.favorites.push(req.params.id);
//   } else {
//     // remove the pug from the user's favorites
//     req.currentUser.favorites = req.currentUser.favorites.filter(pug => pug.id !== req.params.id);
//   }
//   // save the user
//   req.currentUser.save()
//     .then(() => res.redirect('/pugs'))
//     .catch(next);
// }

function pugsDelete(req, res, next) {
  Pug
    .findById(req.params.id)
    .then(pug => {
      if(!pug) return res.notFound();
      return pug.remove();
    })
    .then(() => res.redirect('/pugs'))
    .catch(next);
}

module.exports = {
  index: pugsIndex,
  new: pugsNew,
  create: pugsCreate,
  show: pugsShow,
  edit: pugsEdit,
  update: pugsUpdate,
  delete: pugsDelete
  // favorite: pugsFavorite
};
