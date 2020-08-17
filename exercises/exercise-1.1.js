require("dotenv").config()
const { MONGO_URI } = process.env
const { MongoClient } = require("mongodb")

const dbFunction = async (dbName) => {
  // options for MongoClient
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  // create and connect to a MongoClient
  const client = await MongoClient(MONGO_URI, options).connect()

  // connect to the database
  const db = client.db(dbName)
  console.log("connected!")

  // add some data to the db
  await db.collection('users').insertOne({ name: 'Buck Rogers'})

  // close the connection to the dabase server
  client.close()
  console.log("disconnected!")
}

dbFunction('exercise_1')