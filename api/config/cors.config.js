const cors = require("cors")

module.exports = cors({
  origin: process.env.CORS_ORIGIN || "http://127.0.0.1:5173",
  credentials: true,
})