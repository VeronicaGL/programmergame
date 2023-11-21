const express = require("express");
const router = express.Router();
const questions = require("../controllers/questions.controller")
const user = require("../controllers/user.controller")
const authMid = require("../middlewares/auth.middlewares");
const game = require("../controllers/game.controller");

router.get("/questions", authMid.isAuthenticated, authMid.isAdmin, questions.list)
router.post("/questions", authMid.isAuthenticated, questions.questionsCreate)
router.delete("/questions/:id", authMid.isAuthenticated, authMid.isAdmin, questions.questionsDelete)

router.get("/game/randomquestions", authMid.isAuthenticated, game.randomQuestionsList)
router.post("/game/checkanswer", authMid.isAuthenticated, game.checkAnswer);
router.get("/game/topUsers", game.getTopUsers);

router.post("/register", user.userCreate)
router.get("/users", authMid.isAuthenticated, authMid.isAdmin, user.userList)
router.delete("/users/:id", authMid.isAuthenticated, authMid.isAdmin, user.userDelete)

router.get("/me", authMid.isAuthenticated, user.getDetailUser);

router.post("/login", user.userLogin)
router.post("/logout", user.logout)

module.exports = router;
