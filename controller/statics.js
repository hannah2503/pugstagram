function indexRoute(req, res) {
  res.render('homepage');
}

module.exports = {
  home: indexRoute
};
