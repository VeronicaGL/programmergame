const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  a: String,
  b: String,
  c: String,
  d: String,
  solution: String,
  level: Number,
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;