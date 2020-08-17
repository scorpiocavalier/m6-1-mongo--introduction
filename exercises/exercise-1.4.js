require('dotenv').config();
const {MONGO_URI} = process.env;
const {MongoClient} = require('mongodb');

const dbName = 'exercise_1';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

let client

const dbInit = async () => {
  client = await MongoClient(MONGO_URI, options).connect()
  return client.db()
}

const dbClose = () => client.close()

const addUser = async (req, res) => {
  const db = await dbInit()

  const newUser = {
    "name": "Morty Smith"
  }

  await db.collection('users').insertOne(newUser)

  dbClose()

  res.status(201).json('A new user has been added.')
}

module.exports = { addUser }