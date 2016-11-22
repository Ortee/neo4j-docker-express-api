'use strict';

const express = require('express');
const app = express();
const neo4j = require('node-neo4j');
const bodyParser = require('body-parser');
const db = new neo4j('http://neo4j:password@neo4j:7474');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// [GET] ALL PEOPLE
// http://localhost:3000/people
app.get('/people', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  db.cypherQuery('MATCH (n:Person) RETURN n', {}, function(err, results) {
    res.send(results.data);
    err != true ?
    res.status(200).send() :
    res.status(404).send();
  });
});

// [GET] SINGLE PERSON BY NAME
// http://localhost:3000/person/John
app.get('/person/:name', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  db.cypherQuery('MATCH (p:Person) WHERE p.name = "' + req.params.name + '" RETURN p',
   {}, function(err, results) {
     res.send(results.data);
     err != true ?
     res.status(200).send() :
     res.status(404).send();
   });
});

// [POST] ADD PERSON
// // http://localhost:3000/person

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
    res.status(200).send() :
    res.status(404).send();
  });
});

// [POST] ADD RELATIONSHIP BEETWEN PEOPLE
// // http://localhost:3000/knows

// {
//  "name1": "John",
//  "name2": "Ann"
// }
app.post('/know', function(req, res) {
  req.accepts('application/json');
  db.cypherQuery('MATCH (a:Person { name: "' + req.body.name1 + '" }), (b:Person { name: "' + req.body.name2 + '" }) CREATE (a)-[:KNOWS]->(b)',
    {}, function(err) {
      err != true ?
      res.status(201).send() :
      res.status(404).send();
    });
});


// [DELETE] DELETE PERSON
// // http://localhost:3000/person

// {
//  "name": "John"
// }
app.delete('/person', function(req, res) {
  req.accepts('application/json');
  db.cypherQuery('MATCH (p:Person)-[rel:KNOWS]->() WHERE p.name = "' + req.body.name + '" DELETE rel',
    {}, function(err) {
      err != true ?
      res.status(204).send() :
      res.status(409).send();
    });
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});
