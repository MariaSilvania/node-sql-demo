import * as restify from 'restify';
import { Technologies } from './technologies';

let server = restify.createServer();
server.use(restify.plugins.bodyParser());

let tech = new Technologies();

server.get('/tech/:id', tech.getTechnologies);
server.del('/tech/:id', tech.deleteTechnology);
server.post('/tech', tech.insertTechnology);

server.listen(8081, function () {
  console.log('%s listening at %s', server.name, server.url);
});