"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const technologies_1 = require("./technologies");
let server = restify.createServer();
server.use(restify.plugins.bodyParser());
let tech = new technologies_1.Technologies();
server.get('/tech/:id', tech.getTechnologies);
server.post('/tech', tech.insertTechnology);
server.del('/tech:id', tech.deleteTechnology);
server.listen(8081, function () {
    console.log('%s listening at %s', server.name, server.url);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFtQztBQUNuQyxpREFBOEM7QUFFOUMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQ3BDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0FBRXpDLElBQUksSUFBSSxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO0FBRTlCLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUM1QyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUU5QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtJQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdELENBQUMsQ0FBQyxDQUFDIn0=