> Neo4j Docker Node Express REST API

![alt tag](http://tech.orteedev.pl/neo4j-logo.png)

## Install:
```
[Docker](https://www.docker.com/)   
```
```
[Node v6.X](https://nodejs.org/en/)   
```
```
[Npm](https://docs.npmjs.com/getting-started/installing-node)   
```
```
$ git clone https://github.com/Ortee/neo4j-docker-express-api.git neo4j-docker-express
$ cd neo4j-docker-express
$ npm install
```
## Usage
START
```
$ docker-compose up
Wait few seconds
Open browser: http://localhost:7474/browser/
Set neo4j password
Open docker-compose.yml set CONNECTION_STRING_DEV with your new neo4j password
Restart containers (ctrl+c & $ docker-compose up)
```

## Usage
RUN TESTS
```
npm test
```

## DOCS
```
[CYPHER QUERIES](https://neo4j.com/docs/developer-manual/current/cypher/)   
```
![alt tag](http://tech.orteedev.pl/graph.png)
