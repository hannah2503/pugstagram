const express = require('express');
const router  = express.Router();

// A home route
router.get('/', (req, res) => res.render('homepage'));

// RESTful routes for the Pug resource
// All URLS should contain /pugs

// INDEX
router.get('/pugs', (req, res) =>  res.render('pugs/index'));
// NEW
router.get('/pugs/new', (req, res) => res.send('pugs/new'));
// SHOW
router.get('/pugs/:id', (req, res) => res.send('SHOW'));
// CREATE
router.post('/pugs', (req, res) => res.send('CREATE'));
// EDIT
router.get('/pugs/:id/edit', (req, res) => res.send('EDIT'));
// UPDATE
router.put('/pugs/:id', (req, res) => res.send('UPDATE'));
// DELETE
router.delete('/pugs/:id', (req, res) => res.send('DELETE'));



module.exports = router;
