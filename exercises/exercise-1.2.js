require('dotenv').config()
const { MONGO_URI } = process.env
const { MongoClient, Db } = require('mongodb')

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const getCollection = async (dbName) => {
  const client = await MongoClient(MONGO_URI, options).connect()
  const db = client.db(dbName)
  const users = await db.collection('users').find().toArray()

  console.log('users', users)
}

getCollection('exercise_1')