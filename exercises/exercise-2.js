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

module.exports = { createGreeting }
