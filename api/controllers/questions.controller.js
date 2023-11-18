const Question = require('../models/questions/questions.models');

module.exports.list = async (req, res, next) => {
  const questions = await Question.find({})
  res.json(questions)
}

module.exports.questionsCreate = async (req, res, next) => {
  const savedQuestion = await new Question(req.body).save()
  res.status(201).json(savedQuestion);
}

module.exports.questionsDelete = async (req, res, nex) => {
  const questionId = req.params.id
  const questionDelete = await Question.findOneAndDelete({ _id: questionId })
  res.status(204).send()
}