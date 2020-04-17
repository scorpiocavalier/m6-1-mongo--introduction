'use strict';

const { MongoClient } = require('mongodb');
const assert = require('assert');

const client = new MongoClient('mongodb://localhost:27017', {
  useUnifiedTopology: true,
});

const createGreeting = async (req, res) => {
  try {
    await client.connect();

    const db = client.db('exercises');

    const r = await db.collection('two').insertOne(req.body);
    assert.equal(1, r.insertedCount);
    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  client.close();
};

module.exports = { createGreeting };
