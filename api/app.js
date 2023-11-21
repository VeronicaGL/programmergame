require('dotenv').config()
const express = require("express")
const app = express()
const logger = require("morgan")

require("./config/db.config")

const cors = require("./config/cors.config")
app.use(cors)

const sessionConfig = require('./config/session.config')
app.use(sessionConfig.session)
app.use(sessionConfig.loadSessionUser)

app.use(express.json())
app.use(logger("dev"))

const routes = require("./config/routes.config")
app.use("/api/v1", routes)

app.use((req, res, next) => {
  res.status(404).json({ error: 'No encontrado' })
})
app.use((err, req, res, next) => {
  res.status(err.status).json({ error: err })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Yes, it's ok! ${PORT}`))