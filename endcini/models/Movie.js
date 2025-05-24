const mongoose = require('mongoose');

// Movie schema definition
const movieSchema = new mongoose.Schema({
  movieName: { type: String, required: true },
  movieNumber: { type: String, required: true },
  actorName: { type: String, required: true },
  directorName: { type: String, required: true },
  email: { type: String, required: true },
  countryCode: { type: String, default: '+91' },
  mobile: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  imageUrl: { type: String, required: true }, // store the image URL
  description: { type: String, default: '' },
});

// Movie model creation
const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
