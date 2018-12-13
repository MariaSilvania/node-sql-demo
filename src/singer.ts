import * as sql from "mssql";
import { SqlConnection } from "./connection";

export class Singer {
    public async insertSinger(req, res, next) {
        const connection = new SqlConnection();
        const pool = await connection.open();

        const result = await pool.request()
            .input("name", sql.VarChar(20), req.body.name)
            .input("description", sql.VarChar(300), req.body.description)
            .query("INSERT INTO Singers VALUES (@name, @description)");

        await connection.close();
        res.send(200, { rowsAffected: result.rowsAffected[0] });
        return next();
    }

    public async getSingers(req, res, next) {
        const connection = new SqlConnection();
        const pool = await connection.open();

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

        await connection.close();
        return next();
    }

    public async updateSinger(req, res, next) {
        const connection = new SqlConnection();
        const pool = await connection.open();

        const result = await pool.request()
            .input("id", sql.Int, req.body.id)
            .input("name", sql.VarChar(20), req.body.name)
            .input("description", sql.VarChar(300), req.body.description)
            .query("UPDATE Singers SET NAME = @name, DESCRIPTION = @description WHERE Id = @id");

        await connection.close();
        res.send(200, { rowsAffected: result.rowsAffected[0] });
        return next();
    }

    public async deleteSinger(req, res, next) {
        const connection = new SqlConnection();
        const pool = await connection.open();

        const result = await pool.request()
            .input("id", sql.Int, req.params.id)
            .query("DELETE Singers WHERE ID = @id");

        await connection.close();
        res.send(200, { rowsAffected: result.rowsAffected[0] });
        return next();
    }
}
