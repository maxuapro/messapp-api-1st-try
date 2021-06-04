require('dotenv').config()

const express = require('express')
const serverless = require('serverless-http')
const cors = require('cors')
const app = express()
const todos = require('./routes/routes') // all the routing logic here
const mongoose = require('mongoose')

// const PORT = 3001

// DB connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Database'))




app.use(cors())
app.use(express.json())
app.use('/.netlify/functions/server', todos)

// app.listen(PORT, () => console.log(`Listening on ${PORT}`))

module.exports.handler = serverless(app)