const Pug = require('../models/pug');
const costumes = [
  'Food',
  'Seasonal',
  'Superhero',
  'Princess',
  'Animal'
];

function pugsIndex(req, res, next) {
  Pug
    .find()
    .then((pugs) => res.render('pugs/index', { pugs }))
    .catch(next);
}

function pugsNew(req, res) {
  res.render('pugs/new', {costumes});
}

function pugsCreate(req, res, next) {
  Pug
    .create(req.body)
    .then(() => res.redirect('/pugs/index'))
    .catch(next);
}

function pugsShow(req, res, next) {
  Pug
    .findById(req.params.id)
    .then((pug) => {
      if(!pug) return res.status(404).render('statics/404');
      console.log(pug);
      res.render('pugs/show');
    })
    .catch(next); //add error
}

function pugsEdit(req, res, next) {
  Pug
    .findById(req.params.id)
    .then((pug) => {
      if(!pug) return res.status(404).render('statics/404');
      res.render('pugs/edit');
    })
    .catch(next);
}

function pugsUpdate(req, res, next) {
  Pug
    .findById(req.params.id)
    .then((pug) => {
      if(!pug) return res.status(404).render('statics/404');

      for(const field in req.body) {
        pug[field] = req.body[field];
      }

      return pug.save();
    })
    .then((pug) => res.redirect(`/pugs/${pug.id}`))
    .catch(next);
}

function pugsDelete(req, res, next) {
  Pug
    .findById(req.params.id)
    .then((pug) => {
      if(!pug) return res.status(404).render('statics/404');
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
};
