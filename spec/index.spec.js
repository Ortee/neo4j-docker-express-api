const request = require("request");

var url = 'http://localhost:3000';

describe("Neo4j simple API by Ortee", function() {

  describe("Server check", function() {
    it("GET /api/people", function(done) {
      request.get(url + '/api/people', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it("GET /api/person/*", function(done) {
      request.get(url + '/api/person/qweasdzxcasdqweasdzxc', function(error, response, body) {
        expect(response.statusCode).toBe(204);
        done();
      });
    });
  });

  describe('description', () => {
    it("POST /api/person -  ADD MALE", function(done){
      request({
        url: url + '/api/person',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: 'Adam123', sex: 'male'})
      }, function(error, response, body){
          if(!error) {
            expect(response.statusCode).toBe(201);
            done();
          }
      });
    });

    it("POST /api/person -  ADD FEMALE", function(done){
      request({
        url: url + '/api/person',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: 'Ann123', sex: 'female'})
      }, function(error, response, body){
          if(!error) {
            expect(response.statusCode).toBe(201);
            done();
          }
      });
    });

    it("GET /api/person/* GET MALE", function(done) {
      request.get(url + '/api/person/Adam123', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("GET /api/person/* GET FEMALE", function(done) {
      request.get(url + '/api/person/Ann123', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("POST /api/know ADD RELATIONSHIP", function(done){
      request({
        url: url + '/api/know',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name1: 'Ann123', name2: 'Adam123'})
      }, function(error, response, body){
          if(!error) {
            expect(response.statusCode).toBe(201);
            done();
          }
      });
    });

    it("DELETE /api/person DELETE MALE", function(done){
      request({
        url: url + '/api/person',
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: 'Adam123'})
      }, function(error, response, body){
          if(!error) {
            expect(response.statusCode).toBe(204);
            done();
          }
      });
    });

    it("DELETE /api/person DELETE FEMALE", function(done){
      request({
        url: url + '/api/person',
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: 'Ann123'})
      }, function(error, response, body){
          if(!error) {
            expect(response.statusCode).toBe(204);
            done();
          }
      });
    });
    
  });
});
