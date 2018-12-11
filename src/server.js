var restify = require('restify');
var technologies = require('./technologies');

var server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.get('/tech/:id', technologies.getTechnologies);
server.post('/tech', technologies.insertTechnology);

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});