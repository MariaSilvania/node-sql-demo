const sql = require("mssql");
const sqlConnection = require("./connection");

exports.insertSinger = async function (req, res, next) {
    const pool = await sqlConnection.open();

    const result = await pool.request()
        .input("name", sql.VarChar(20), req.body.name)
        .input("description", sql.VarChar(300), req.body.description)
        .query("INSERT INTO Singers VALUES (@name, @description)");

    await sqlConnection.close();
    res.send(200, { rowsAffected: result.rowsAffected[0] });
    return next();
}

exports.getSingers = async function (req, res, next) {
    const pool = await sqlConnection.open();

    let result;
    if (req.params.id) {
        result = await pool.request()
            .input("id", sql.Int, req.params.id)
            .query("SELECT Id, Name, Description FROM Singers WHERE ID = @id");
    } else {
        result = await pool.request()
            .query("SELECT Id, Name, Description FROM Singers");
    }

    res.send(result.recordset);

    await sqlConnection.close();
    return next();
}

exports.updateSinger = async function (req, res, next) {
    const pool = await sqlConnection.open();

    const result = await pool.request()
        .input("id", sql.Int, req.body.id)
        .input("name", sql.VarChar(20), req.body.name)
        .input("description", sql.VarChar(300), req.body.description)
        .query("UPDATE Singers SET NAME = @name, DESCRIPTION = @description WHERE Id = @id");

    await sqlConnection.close();
    res.send(200, { rowsAffected: result.rowsAffected[0] });
    return next();
}

exports.deleteSinger = async function (req, res, next) {
    const pool = await sqlConnection.open();

    const result = await pool.request()
        .input("id", sql.Int, req.params.id)
        .query("DELETE Singers WHERE ID = @id");

    await sqlConnection.close();
    res.send(200, { rowsAffected: result.rowsAffected[0] });
    return next();
}
