## Description

[Kodo](https://github.com/chandanpasunoori/kodo-search-sample) Search Sample

Sample project with Nest.js microservices using NATS as bridge.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# search service
$ npm start search-service

# kodo service
$ npm start kodo-service

```

## Docker Steps

```bash
# search service
$ docker build -t search . -f search.Dockerfile
$ docker run -it search:latest
# kodo service
$ docker build -t kodo . -f kodo.Dockerfile
$ docker run -it -p 3000:3000 kodo:latest

# or use docker hub images directly 
docker run -it chandanpasunoori/search:latest
docker run -it -p 3000:3000 chandanpasunoori/kodo:latest
```

## curl example
```bash
curl --location --request GET 'http://localhost:3000/search?searchTerm=Customer%20%22Assurance%22&sort=dateLastEdited&page=1&pageSize=10'
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
