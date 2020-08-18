"use strict"

const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const { getUsers } = require("./exercises/exercise-1.3")
const { addUser } = require("./exercises/exercise-1.4")
const {
  getAllGreetings,
  getGreeting,
  createGreeting,
  deleteGreeting,
} = require('./exercises/exercise-2')

const PORT = process.env.PORT || 8000

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  .get('/exercise-1/users', getUsers)
  .post('/exercise-1/users', addUser)

  .get('/exercise-2/greeting', getAllGreetings)
  .get('/exercise-2/greeting/:_id', getGreeting)
  .post('/exercise-2/greeting', createGreeting)
  .delete('/exercise-2/greeting/:_id', deleteGreeting)

  .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

  .listen(PORT, () => console.log(`Listening on port ${ PORT }`))
