const express = require('express')
const multer = require('multer')

require('./db/mongoose')
const jwt = require('jsonwebtoken')
const userRouter = require("./router/users")
const taskRouter = require("./router/tasks")

const app = express()


//configure express to convert inbound json payloads to objects mapped to req.body
app.use(express.json())

//add the other router files to enable them
app.use(userRouter)
app.use(taskRouter)

module.exports = app