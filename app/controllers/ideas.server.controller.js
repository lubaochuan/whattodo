var mongoose = require('mongoose'),
  Idea = mongoose.model('Idea');
  
var getErrorMessage = function(err) {
  if (err.errors) {
    for (var errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Unknown server error';
  }
};

exports.create = function(req, res) {
  var idea = new Idea(req.body);
  idea.creator = req.user;
  idea.save(function(err) {
    if (err) {
      return res.status(400).send({message: getErrorMessage(err)});
    } else {
      res.json(idea);
    }
  });
};

exports.list = function(req, res) {
  Idea.find().sort('-created')
    .populate('creator', 'firstName lastName fullName')
    .exec(function(err, ideas) {
      if (err) {
        return res.status(400).send({message: getErrorMessage(err)});
      } else {
        res.json(ideas);
      }}); 
};

exports.ideaByID = function(req, res, next, id) {
  Idea.findById(id)
    .populate('creator', 'firstName lastName fullName')
    .exec(function(err, idea) {
      if (err) return next(err);
      if (!idea) return next(new Error('Failed to load idea ' + id));
      req.idea = idea;
      next(); 
    });
};

exports.read = function(req, res) {
  res.json(req.idea);
};

exports.update = function(req, res) {
  var idea = req.idea;
  idea.title = req.body.title;
  idea.content = req.body.content;
  idea.save(function(err) {
    if (err) {
      return res.status(400).send({message: getErrorMessage(err)});
    } else {
      res.json(idea);
    }
  });
};

exports.delete = function(req, res) {
  var idea = req.idea;
  idea.remove(function(err) {
    if (err) {
      return res.status(400).send({message: getErrorMessage(err)});
    } else {
      res.json(idea);
    }
  });
};

exports.hasAuthorization = function(req, res, next) {
  if (req.idea.creator.id !== req.user.id) {
    return res.status(403).send({message: 'User is not authorized'});
  }
  next();
};