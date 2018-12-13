"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql = require("mssql");
const connection_1 = require("./connection");
class Song {
    async insertSong(req, res, next) {
        let connection = new connection_1.SqlConnection();
        let pool = await connection.open();
        let result = await pool.request()
            .input("albumId", sql.Int, req.body.albumId)
            .input("name", sql.VarChar(20), req.body.name)
            .input("composer", sql.VarChar(300), req.body.composer)
            .query("INSERT INTO Songs VALUES (@albumId, @name, @composer)");
        await connection.close();
        res.send(200, { "rowsAffected": result.rowsAffected[0] });
        return next();
    }
    async getSongs(req, res, next) {
        let connection = new connection_1.SqlConnection();
        let pool = await connection.open();
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
        }
        else {
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
        await connection.close();
        return next();
    }
    ;
    async getSongsBySinger(req, res, next) {
        let connection = new connection_1.SqlConnection();
        let pool = await connection.open();
        let result = await pool.request()
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
        await connection.close();
        return next();
    }
    ;
    async getSongsByAlbum(req, res, next) {
        let connection = new connection_1.SqlConnection();
        let pool = await connection.open();
        let result = await pool.request()
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
        await connection.close();
        return next();
    }
    ;
    async updateSong(req, res, next) {
        let connection = new connection_1.SqlConnection();
        let pool = await connection.open();
        let result = await pool.request()
            .input("id", sql.Int, req.body.id)
            .input("name", sql.VarChar(20), req.body.name)
            .input("composer", sql.VarChar(300), req.body.composer)
            .query("UPDATE Songs SET NAME = @name, COMPOSER = @composer WHERE Id = @id");
        await connection.close();
        res.send(200, { "rowsAffected": result.rowsAffected[0] });
        return next();
    }
    async deleteSong(req, res, next) {
        let connection = new connection_1.SqlConnection();
        let pool = await connection.open();
        let result = await pool.request()
            .input("id", sql.Int, req.params.id)
            .query("DELETE Songs WHERE ID = @id");
        await connection.close();
        res.send(200, { "rowsAffected": result.rowsAffected[0] });
        return next();
    }
}
exports.Song = Song;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29uZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zb25nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTZCO0FBQzdCLDZDQUE2QztBQUU3QyxNQUFhLElBQUk7SUFDTixLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtRQUNsQyxJQUFJLFVBQVUsR0FBRyxJQUFJLDBCQUFhLEVBQUUsQ0FBQztRQUNyQyxJQUFJLElBQUksR0FBRyxNQUFNLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVuQyxJQUFJLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUU7YUFDNUIsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQzNDLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUM3QyxLQUFLLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDdEQsS0FBSyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7UUFFcEUsTUFBTSxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekIsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUQsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRU0sS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7UUFDaEMsSUFBSSxVQUFVLEdBQUcsSUFBSSwwQkFBYSxFQUFFLENBQUM7UUFDckMsSUFBSSxJQUFJLEdB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