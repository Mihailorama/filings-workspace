#!/usr/bin/env node

const express = require('express');
const path = require('path');

const app = express();
app.use('/', express.static(path.join(__dirname, '../www')));

const server = app.listen(8080, 'localhost', () => {
  const address = server.address();
  console.log(`App listening at http://${address.address}:${address.port}`);
})
