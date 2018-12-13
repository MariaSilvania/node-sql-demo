import * as sql from "mssql";
import { SqlConnection } from "./connection";

export class Album {
    public async insertAlbum(req, res, next) {
        const connection = new SqlConnection();
        const pool = await connection.open();

        const result = await pool.request()
            .input("singerId", sql.Int, req.body.singerId)
            .input("name", sql.VarChar(20), req.body.name)
            .input("year", sql.Int, req.body.year)
            .query("INSERT INTO Albums VALUES (@singerId, @name, @year)");

        await connection.close();
        res.send(200, { rowsAffected: result.rowsAffected[0] });
        return next();
    }

    public async getAlbums(req, res, next) {
        const connection = new SqlConnection();
        const pool = await connection.open();

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

        await connection.close();
        return next();
    }

    public async getAlbumsBySinger(req, res, next) {
        const connection = new SqlConnection();
        const pool = await connection.open();

        const result = await pool.request()
            .input("singerId", sql.Int, req.params.singerId)
            .query(`
                SELECT a.Id, a.Name, a.Year, s.Name as Singer
                FROM Albums a INNER JOIN Singers s ON a.SingerId = s.Id
                WHERE s.Id = @singerId`);

        res.send(result.recordset);

        await connection.close();
        return next();
    }

    public async updateAlbum(req, res, next) {
        const connection = new SqlConnection();
        const pool = await connection.open();

        const result = await pool.request()
            .input("id", sql.Int, req.body.id)
            .input("name", sql.VarChar(20), req.body.name)
            .input("year", sql.Int, req.body.year)
            .query("UPDATE Albums SET NAME = @name, YEAR = @year WHERE Id = @id");

        await connection.close();
        res.send(200, { rowsAffected: result.rowsAffected[0] });
        return next();
    }

    public async deleteAlbum(req, res, next) {
        const connection = new SqlConnection();
        const pool = await connection.open();

        const result = await pool.request()
            .input("id", sql.Int, req.params.id)
            .query("DELETE Albums WHERE ID = @id");

        await connection.close();
        res.send(200, { rowsAffected: result.rowsAffected[0] });
        return next();
    }
}
