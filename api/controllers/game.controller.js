const gameUser = require('../models/game/game.models')
const User = require('../models/users/user.models')
const Questions = require('../models/questions/questions.models')

module.exports.randomQuestionsList = async (req, res, next) => {

  try {
    let allQuestions = await Questions.find()
    if (allQuestions.length === 0) {
      return res.status(404).json({ message: '¡No quedan más preguntas!' })
    }

    allQuestions.sort((a, b) => a.level - b.level)

    const numberQuestion = allQuestions.length

    for (let i = 0; i < numberQuestion; i++) {
      allQuestions[i].level = i + 1
    }

    const questionsRandom = []
    const numberQuestionsListGame = 5

    if (allQuestions.length >= numberQuestionsListGame) {
      for (let i = 0; i < numberQuestionsListGame; i++) {
        const randomIndex = Math.floor(Math.random() * allQuestions.length);
        questionsRandom.push(allQuestions[randomIndex]);
        allQuestions.splice(randomIndex, 1);
      }
    } else {
      return res.status(404).json({ message: 'No quedan suficientes preguntas' })
    }
    res.status(200).json({ questions: questionsRandom })
  } catch (error) {
    console.error('Error al obtener las preguntas', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

module.exports.checkAnswer = async (req, res, next) => {

  try {

    if (!req.body.question || !req.body.selectedAnswer) {
      return res.status(400).json({ message: 'Se necesita el ID de la pregunta' })
    }

    const question = await Questions.findById(req.body.question)

    if (!question) {
      return res.status(404).json({ message: 'No se encontró la pregunta' })
    }
    if (question.solution === req.body.selectedAnswer) {
      
      req.user.rightQuestions.push(question._id)
      await req.user.save()
      return res.status(200).json({ message: '¡Respuesta Correcta!', isCorrect: true })
    } else {
      req.user.wrongQuestions.push(question._id)
      await req.user.save()
      return res.status(200).json({ message: 'Respuesta incorrecta :(', isCorrect: false })
    }
  } catch (error) {
    console.error('Error al verificar la respuesta', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

// recibe req.body.question el ID de la pregunta
// recibe req.body.answer: "a",b, c...
// busca la pregunta Question.findById(req.body.question)
// si question.solution es igual a req.body.answer:^
// añadimos la question al usuario en req.user.rightQuestions.push..