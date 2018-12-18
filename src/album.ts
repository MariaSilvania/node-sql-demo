const sql = require("mssql");
const sqlConnection = require("./connection");

exports.insertAlbum = async function (req, res, next) {
    const pool = await sqlConnection.open();

    const result = await pool.request()
        .input("singerId", sql.Int, req.body.singerId)
        .input("name", sql.VarChar(20), req.body.name)
        .input("year", sql.Int, req.body.year)
        .query("INSERT INTO Albums VALUES (@singerId, @name, @year)");

    await sqlConnection.close();
    res.send(200, { rowsAffected: result.rowsAffected[0] });
    return next();
}

exports.getAlbums = async function (req, res, next) {
    const pool = await sqlConnection.open();

    let result;
    if (req.params.id) {
        result = await pool.request()
            .input("id", sql.Int, req.params.id)
            .query(`
                    SELECT a.Id, a.Name, a.Year, s.Name as Singer
                    FROM Albums a INNER JOIN Singers s ON a.SingerId = s.Id
                    WHERE a.Id = @id`);
    } else {
        result = await pool.request()
            .query(`
                    SELECT a.Id, a.Name, a.Year, s.Name as Singer
                    FROM Albums a INNER JOIN Singers s ON a.SingerId = s.Id`);
    }

    res.send(result.recordset);

    await sqlConnection.close();
    return next();
}

exports.getAlbumsBySinger = async function (req, res, next) {
    const pool = await sqlConnection.open();

    const result = await pool.request()
        .input("singerId", sql.Int, req.params.singerId)
        .query(`
                SELECT a.Id, a.Name, a.Year, s.Name as Singer
                FROM Albums a INNER JOIN Singers s ON a.SingerId = s.Id
                WHERE s.Id = @singerId`);

    res.send(result.recordset);

    await sqlConnection.close();
    return next();
}

exports.updateAlbum = async function (req, res, next) {
    const pool = await sqlConnection.open();

    const result = await pool.request()
        .input("id", sql.Int, req.body.id)
        .input("name", sql.VarChar(20), req.body.name)
        .input("year", sql.Int, req.body.year)
        .query("UPDATE Albums SET NAME = @name, YEAR = @year WHERE Id = @id");

    await sqlConnection.close();
    res.send(200, { rowsAffected: result.rowsAffected[0] });
    return next();
}

exports.deleteAlbum = async function (req, res, next) {
    const pool = await sqlConnection.open();

    const result = await pool.request()
        .input("id", sql.Int, req.params.id)
        .query("DELETE Albums WHERE ID = @id");

    await sqlConnection.close();
    res.send(200, { rowsAffected: result.rowsAffected[0] });
    return next();
}
