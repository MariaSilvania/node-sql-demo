var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

// Create connection to database
var config = {
    userName: 'sa', // update me
    password: 'Avanade@2018', // update me
    server: 'localhost',
    options: {
        database: 'Tech'
    }
}

var connection;

function getTechnologies(req, res, next) {
    connection = new Connection(config);

    // Attempt to connect and execute queries if connection goes through
    connection.on('connect', function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected');
            Read((content) => {
                res.send(content);
                return next();
            });
        }
    });
}

function Read(callback) {
    console.log('Reading rows from the Table...');

    // Read all rows from table
    request = new Request(
        'SELECT Id, Name, Description FROM Tech;',
        function (err, rowCount, rows) {
            if (err) {
                callback(err);
            } else {
                console.log(rowCount + ' row(s) returned');
                callback(result);
            }
        });

    // Print the rows read
    let result = [];
    request.on('row', function (columns) {
        let register = {};
        columns.forEach(function (column) {
            console.log(column);
            if (column.value === null) {
                console.log('NULL');
            } else {
                register[column.metadata.colName] = column.value;
            }
        });
        result.push(register);
    });

    // Execute SQL statement
    connection.execSql(request);
}

function insertTechnology(req, res, next) {
    connection = new Connection(config);

    // Attempt to connect and execute queries if connection goes through
    connection.on('connect', function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected');
            Insert(req.body.name, req.body.description, (a, b, c) => console.log('success'));
        }

        res.send(200, { "inserted": true });
        return next();
    });
}

function Insert(name, description, callback) {
    console.log("Inserting '" + name + "' into Table...");

    request = new Request(
        'INSERT INTO Tech (Name, Description) OUTPUT INSERTED.Id VALUES (@Name, @Description);',
        function (err, rowCount, rows) {
            if (err) {
                callback(err);
            } else {
                console.log(rowCount + ' row(s) inserted');
                callback(null, 'Nikita', 'United States');
            }
        });
    request.addParameter('Name', TYPES.NVarChar, name);
    request.addParameter('Description', TYPES.NVarChar, description);

    // Execute SQL statement
    connection.execSql(request);
}

exports.getTechnologies = getTechnologies;
exports.insertTechnology = insertTechnology;