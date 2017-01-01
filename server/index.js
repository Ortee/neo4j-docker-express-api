'use strict';

const express = require('express');
const app = express();
const neo4j = require('node-neo4j');
const bodyParser = require('body-parser');
const db = new neo4j(process.env.CONNECTION_STRING_DEV);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// [GET] ALL PEOPLE
  // http://localhost:3000/api/people
app.get('/api/people', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  db.cypherQuery('MATCH (n:Person) RETURN n', {}, function(err, results) {
    if (err) {
      res.status(503).send('Check database connection');
    } else {
      res.send(results.data);
      res.status(200).send();
    }
  });
});

// [GET] SINGLE PERSON BY NAME
// http://localhost:3000/api/person/John
app.get('/api/person/:name', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  db.cypherQuery('MATCH (p:Person) WHERE p.name = "' + req.params.name + '" RETURN p',
   {}, function(err, results) {
     if (err) {
       res.status(503).send('Check database connection');
     } else {
       if (results.data.length > 1) {
         res.send(results.data);
         res.status(200).send();
       } else {
         res.status(204).send();
       }

     }
   });
});

// [POST] ADD PERSON
// // http://localhost:3000/api/person

// {
//  "name": "John",
//  "sex": "male"
// }
app.post('/api/person', function(req, res) {
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

// [POST] ADD RELATIONSHIP BEETWEN PEOPLE
// // http://localhost:3000/api/knows

// {
//  "name1": "John",
//  "name2": "Ann"
// }
app.post('/api/know', function(req, res) {
  req.accepts('application/json');
  db.cypherQuery('MATCH (a:Person { name: "' + req.body.name1 + '" }), (b:Person { name: "' + req.body.name2 + '" }) CREATE (a)-[:KNOWS]->(b)',
    {}, function(err) {
      err != true ?
      res.status(201).send() :
      res.status(404).send();
    });
});


// [DELETE] DELETE PERSON
// // http://localhost:3000/api/person

// {
//  "name": "John"
// }
app.delete('/api/person', function(req, res) {
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
