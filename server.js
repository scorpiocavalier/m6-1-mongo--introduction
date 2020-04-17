'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = process.env.PORT || 8000;

express()
  .use(morgan('tiny'))
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // handle 404s
  .use((req, res) => {
    const errMessage = "The page you requested doesn't seem to exist.🤷‍♂️";

    if (req.accepts('json')) {
      res.status(404).json({ error: errMessage });
      return;
    }

    res.status(404).type('txt').send(errMessage);
  })

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
