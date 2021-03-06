require('dotenv').config()
const { MONGO_URI } = process.env
const { MongoClient } = require('mongodb')

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

const getCollection = async () => {
  // create and connect a client, and return the db
  const db = await dbInit()

  // get the users collection
  const users = await db.collection('users').find().toArray()
  console.log(users)

  // close the db connection
  dbClose()
}

getCollection()