const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  point: {
    type: Number,
    default: 0,
    required: true
  },
  level: {
    type: Number,
    default: 0,
    required: true
  },
  correctQuestion: {
    type: [String],
    required: true
  }
});
const game = mongoose.model('game', gameSchema)
module.exports = game;