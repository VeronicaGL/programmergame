const mongoose = require("mongoose")

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:programmergame-project'

mongoose.connect(MONGODB_URI)
  .then(() =>
    console.info(`conect to the database ${MONGODB_URI}`))
  .catch((error) =>
    console.error(`An error in to the database ${MONGODB_URI}`,error)) 