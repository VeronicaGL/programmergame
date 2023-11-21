const User = require('../models/users/user.models');

module.exports.userCreate = async (req, res, next) => {
  try {
    console.log(req.body)
    const newUser = new User({
      name: req.body.name,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      avatar: req.body.avatar
    })

    const user = await newUser.save()
    res.status(201).json(user)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

module.exports.userList = async (req, res, next) => {
  const users = await User.find({})
  res.json(users)
}

module.exports.userDelete = async (req, res, nex) => {
  const userId = req.params.id
  const userDelete = await User.findOneAndDelete({ _id: userId })
  res.status(204).send()
}

module.exports.getDetailUser = (req, res, next) => {
  res.json(req.user)
}

module.exports.userLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName })
      .populate("rightQuestions")
      .populate("wrongQuestions")
    if (user) {
      const match = await user.comparePassword(req.body.password)
      if (match) {
        req.session.userId = user.id
        res.json(user)
      } else {
        res.status(401).json({ error: 'unauthorized' })
      }
    } else {
      res.status(401).json({ error: 'unauthorized' })
    }
  } catch (error) {
    next(error)
  }
}

module.exports.logout = (req, res, next) => {
  try {
    req.session.destroy()
    res.status(204).json({ message: "Sessión cerrada" })
  } catch (error) {
    res.status(500).json({ message: 'Error en el logout' })
  }
}