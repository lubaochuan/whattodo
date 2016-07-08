var users = require('../../app/controllers/users.server.controller'),
  ideas = require('../../app/controllers/ideas.server.controller');

module.exports = function(app) {
  app.route('/api/ideas')
    .get(ideas.list)
    .post(users.requiresLogin, ideas.create);
  app.route('/api/ideas/:ideaId')
    .get(ideas.read)
    .put(users.requiresLogin, ideas.hasAuthorization, ideas.update)
    .delete(users.requiresLogin, ideas.hasAuthorization, ideas.delete);
  app.param('ideaId', ideas.ideaByID);
};
