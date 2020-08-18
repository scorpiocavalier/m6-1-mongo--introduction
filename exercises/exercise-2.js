require('dotenv').config()
const { MONGO_URI } = process.env
const { MongoClient } = require('mongodb')
const assert = require('assert')

const dbName = 'exercise_1'

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

let client

const dbInit = async () => {
  client = await MongoClient(MONGO_URI, options).connect()
  return client.db(dbName)
}

const dbClose = () => client.close()

const createGreeting = async (req, res) => {
  try {
    const db = await dbInit()

    const response = await db.collection('greetings').insertOne(req.body)
    assert.equal(1, response.insertedCount)

    res.status(201).json({ status: 201, data: req.body })
  } catch (err) {
    console.log(err.stack)
    res.status(500).json({ status: 500, data: req.body, message: err.message })
  }

  dbClose()
}

const getGreeting = async (req, res) => {
  const _id = req.params._id
  const db = await dbInit()

  db.collection('greetings').findOne({ _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, data: result, _id })
      : res.status(404).json({ status: 404, data: err.message, _id })
    dbClose()
  })
}


module.exports = { createGreeting, getGreeting }
