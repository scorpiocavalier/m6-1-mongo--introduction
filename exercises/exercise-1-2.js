'use strict';

const { MongoClient } = require('mongodb');

const getCollection = async (req, res) => {
  const { dbName, collection } = req.params;

  // create a new client
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });

  await client.connect();

  const db = client.db(dbName);

  db.collection(collection)
    .find()
    .toArray((err, result) => {
      if (err) {
        console.log(err);
        res.status(404).json(err);
      } else {
        res.status(200).json(result);
        client.close();
      }
    });
};

module.exports = { getCollection };
