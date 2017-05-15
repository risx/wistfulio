#!/usr/bin/env nodejs

const express = require('express');
const app = express();
const port = 8080;

app.use(express.static('public'));

const server = app.listen(port, () => {
  console.log('Open on localhost:' + port);
});