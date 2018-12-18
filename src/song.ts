const sql = require("mssql");
const sqlConnection = require("./connection");

    exports.insertSong = async function(req, res, next) {
        const pool = await sqlConnection.open();

        const result = await pool.request()
            .input("albumId", sql.Int, req.body.albumId)
            .input("name", sql.VarChar(20), req.body.name)
            .input("composer", sql.VarChar(300), req.body.composer)
            .query("INSERT INTO Songs VALUES (@albumId, @name, @composer)");

        await sqlConnection.close();
        res.send(200, { rowsAffected: result.rowsAffected[0] });
        return next();
    }

    exports.getSongs = async function(req, res, next) {
        const pool = await sqlConnection.open();

        let result;
        if (req.params.id) {
            result = await pool.request()
                .input("id", sql.Int, req.params.id)
                .query(`
                    SELECT
                        so.Id,
                        so.Name,
                        si.Name as Singer,
                        so.Composer,
                        a.Name as Album,
                        a.Year,
                    FROM
                        Songs so INNER JOIN
                        Albums a ON so.AlbumId = a.Id INNER JOIN
                        Singers si on si.Id = a.SingerId
                    WHERE
                        so.ID = @id`);
            } else {
                result = await pool.request()
                    .query(`
                    SELECT
                        so.Id,
                        so.Name,
                        si.Name as Singer,
                        so.Composer,
                        a.Name as Album,
                        a.Year
                    FROM
                        Songs so INNER JOIN
                        Albums a ON so.AlbumId = a.Id INNER JOIN
                        Singers si on si.Id = a.SingerId `);
            }

        res.send(result.recordset);

        await sqlConnection.close();
        return next();
    }

    exports.getSongsBySinger = async function(req, res, next) {
        const pool = await sqlConnection.open();

        const result = await pool.request()
            .input("id", sql.Int, req.params.id)
            .query(`
                SELECT
                    so.Id,
                    so.Name,
                    si.Name as Singer,
                    so.Composer,
                    a.Name as Album,
                    a.Year
                FROM
                    Songs so INNER JOIN
                    Albums a ON so.AlbumId = a.Id INNER JOIN
                    Singers si on si.Id = a.SingerId
                WHERE
                    si.ID = @id`);

        res.send(result.recordset);

        await sqlConnection.close();
        return next();
    }

    exports.getSongsByAlbum = async function(req, res, next) {
        const pool = await sqlConnection.open();

        const result = await pool.request()
        .input("id", sql.Int, req.params.id)
        .query(`
            SELECT
                so.Id,
                so.Name,
                si.Name as Singer,
                so.Composer,
                a.Name as Album,
                a.Year
            FROM
                Songs so INNER JOIN
                Albums a ON so.AlbumId = a.Id INNER JOIN
                Singers si on si.Id = a.SingerId
            WHERE
                a.ID = @id`);

        res.send(result.recordset);

        await sqlConnection.close();
        return next();
    }

    exports.updateSong = async function(req, res, next) {
        const pool = await sqlConnection.open();

        const result = await pool.request()
            .input("id", sql.Int, req.body.id)
            .input("name", sql.VarChar(20), req.body.name)
            .input("composer", sql.VarChar(300), req.body.composer)
            .query("UPDATE Songs SET NAME = @name, COMPOSER = @composer WHERE Id = @id");

        await sqlConnection.close();
        res.send(200, { rowsAffected: result.rowsAffected[0] });
        return next();
    }

    exports.deleteSong = async function(req, res, next) {
        const pool = await sqlConnection.open();

        const result = await pool.request()
            .input("id", sql.Int, req.params.id)
            .query("DELETE Songs WHERE ID = @id");

        await sqlConnection.close();
        res.send(200, { rowsAffected: result.rowsAffected[0] });
        return next();
    }
