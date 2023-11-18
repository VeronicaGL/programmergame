const expressSession = require("express-session");
const MongoStore = require("connect-mongo"); 
const mongoose = require("mongoose");
const User = require("../models/users/user.models");

module.exports.session = expressSession({
  secret: process.env.SESSION_SECRET || "super-secret",
  proxy: process.env.SESSION_SECURE === "true",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: mongoose.connection._connectionString,
    ttl: 15 * 24 * 60 * 60,
  }),
  cookie: {
    httpOnly: true,
    secure: process.env.SESSION_SECURE === "true",
  },
});

module.exports.loadSessionUser = (req, res, next) => {
  const userId = req.session.userId;
    if(userId) {
      User.findById(userId)
      .populate("rightQuestions")
      .populate("wrongQuestions")
        .then((user) => {
          req.user = user;
          next();
        })
        .catch((error) => next(error));

    } else {
      next();
    }
}

