const mongoose = require('mongoose');

const Person = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Enter with your name']
  },
  email: {
    type: String,
    required: [true, 'Enter with your email']
  },
  friendSecret: {
    type: String,
    required: false
  },
  status: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('persons', Person);