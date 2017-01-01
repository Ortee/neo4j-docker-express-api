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

});
