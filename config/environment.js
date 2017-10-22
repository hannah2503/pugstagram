module.exports = {
  port: process.env.PORT || 3000,
  dbURI: process.env.MONGODB_URI || 'mongodb://localhost/wdi_project_2',
  secret: process.env.SESSION_SECRET || 'ssh it\'s a secret'
};
