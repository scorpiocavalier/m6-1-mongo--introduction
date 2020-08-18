require('dotenv').config()
const { MONGO_URI } = process.env
const { MongoClient } = require('mongodb')
const assert = require('assert')

///////////////////////////////////////////////////////////////////////////////

let client

const dbInit = async () => {
  const dbName = 'exercise_1'

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

  client = await MongoClient(MONGO_URI, options).connect()
  return client.db(dbName)
}

const dbClose = () => client.close()

///////////////////////////////////////////////////////////////////////////////

const handleQuery = (query, size) => {
  // query values
  let start = Number(query.start)
  let limit = Number(query.limit)
  console.log('\n...starting values...')
  console.log('start', start)
  console.log('limit', limit)

  // if start is not valid, assign default value of 0
  start = (start !== NaN || start < 1 || start > size)
    ? 0
    : start - 1

  // limit is the smaller between 25, limit and remainder
  const remainder = size - start
  limit = (limit !== NaN || limit < 1 || limit > 25)
    ? Math.min(25, remainder)
    : limit

  // endbound for slicing
  const end = start + limit

  // console log final values
  console.log('\n...final values...')
  console.log('start', start)
  console.log('limit', limit)

  return { start, end, limit }
}

///////////////////////////////////////////////////////////////////////////////

const getAllGreetings = async (req, res) => {
  // get all data from db as an array
  const db = await dbInit()
  const response = await db.collection('greetings').find().toArray()

  // slice the data unless empty
  if (response) {
    // validate query parameters
    const { start, end, limit } = handleQuery(req.query, response.length)

    // slice the data
    let data = response.slice(start, end)
    console.log('\ndata', data)

    const result = { status: 200, start, limit, data }

    res.status(200).json(result)
  } else {
    res.status(404).json({ status: 404, data: "Not Found" })
  }

  dbClose()
}

///////////////////////////////////////////////////////////////////////////////

const getGreeting = async (req, res) => {
  const db = await dbInit()

  const _id = req.params._id
  const criteria = _id.length > 2 ? { lang: _id } : { _id }

  db.collection('greetings').findOne(criteria, (err, result) => {
    result
      ? res.status(200).json({ status: 200, data: result, _id })
      : res.status(404).json({ status: 404, data: err.message, _id })
    dbClose()
  })
}

///////////////////////////////////////////////////////////////////////////////

const createGreeting = async (req, res) => {
  try {
    const db = await dbInit()

    const response = await db.collection('greetings').insertOne(req.body)
    assert.equal(1, response.insertedCount)

    res.status(201).json({ status: 201, data: req.body, message: 'Added!' })
  } catch (err) {
    console.log(err.stack)
    res.status(500).json({ status: 500, data: req.body, message: err.message })
  }

  dbClose()
}

///////////////////////////////////////////////////////////////////////////////

const deleteGreeting = async (req, res) => {
  try {
    const db = await dbInit()

    const response = await db.collection('greetings').deleteOne(req.body);
    assert.equal(1, response.deletedCount);

    res.status(204).json({ status: 204 })
  } catch (err) {
    console.log(err.stack)
    res.status(500).json({ status: 500, data: req.body, message: err.message })
  }
}

///////////////////////////////////////////////////////////////////////////////

module.exports = { getAllGreetings, getGreeting, createGreeting, deleteGreeting }
