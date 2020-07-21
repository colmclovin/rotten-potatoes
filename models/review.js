// models/review.js

const mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true, useFindAndModify: false });
const Comment = require('../models/comment')


const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
});

module.exports = Review;