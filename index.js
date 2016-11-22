'use strict';

const express = require('express');
const app = express();
const neo4j = require('node-neo4j');
const bodyParser = require('body-parser');
const db = new neo4j('http://neo4j:password@neo4j:7474');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// ADD PERSON
//
// {
//  "name": "John",
//  "sex": "male"
// }
app.post('/person', function(req, res) {
  req.accepts('application/json');
  db.insertNode({
    name: req.body.name,
    sex: req.body.sex
  }, ['Person'], function(err) {
    err != true ?
    res.status(201).send() :
    res.status(404).send();
  });
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});
