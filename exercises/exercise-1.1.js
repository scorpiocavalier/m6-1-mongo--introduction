require("dotenv").config()
const { MONGO_URI } = process.env
const { MongoClient } = require("mongodb")

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

const dbFunction = async () => {
  // initiate a db
  const db = await dbInit()
  console.log("connected!")

  // insert some data to the db
  await db.collection('users').insertOne({ name: 'Buck Rogers' })
  console.log('inserted one entry to db')

  // close the connection to the dabase server
  await dbClose()
  console.log("disconnected!")
}

dbFunction()