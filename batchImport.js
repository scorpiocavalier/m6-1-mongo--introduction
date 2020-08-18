require('dotenv').config()
const { MONGO_URI } = process.env
const { MongoClient } = require('mongodb')
const assert = require('assert')
const fs = require('file-system')

const greetings = JSON.parse(fs.readFileSync('data/greetings.json'))

let client

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const dbName = 'exercise_1'

const dbInit = async () => {
  client = await MongoClient(MONGO_URI, options).connect()
  return client.db()
}

const dbClose = () => client.close()

const batchImport = async () => {
  try {
    // create and connect the client, and return the db
    const db = await dbInit()

    // insert all items from greetings.json
    const response = await db.collection('greetings').insertMany(greetings)
    assert.equal(1, response.insertedCount)

    res.status(201).json({ status: 201, data: greetings })
  } catch (err) {
    console.log(err.stack)
    res.status(500).json({ status: 500, data: greetings, message: err.message })
  }

  // close the db connection
  dbClose()
}

batchImport()