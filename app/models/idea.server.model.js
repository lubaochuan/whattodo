var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var IdeaSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Name cannot be blank'
  },
  desc: {
    type: String,
    default: '',
    trim: true
  },
  creator: {
    type: Schema.ObjectId,
    ref: 'User' }
  }
);

mongoose.model('Idea', IdeaSchema);