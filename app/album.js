"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql = require("mssql");
const connection_1 = require("./connection");
class Album {
    async insertAlbum(req, res, next) {
        let connection = new connection_1.SqlConnection();
        let pool = await connection.open();
        let result = await pool.request()
            .input("singerId", sql.Int, req.body.singerId)
            .input("name", sql.VarChar(20), req.body.name)
            .input("year", sql.Int, req.body.year)
            .query("INSERT INTO Albums VALUES (@singerId, @name, @year)");
        await connection.close();
        res.send(200, { "rowsAffected": result.rowsAffected[0] });
        return next();
    }
    async getAlbums(req, res, next) {
        let connection = new connection_1.SqlConnection();
        let pool = await connection.open();
        let result;
        if (req.params.id) {
            result = await pool.request()
                .input("id", sql.Int, req.params.id)
                .query("SELECT a.Id, a.Name, a.Year, s.Name as Singer FROM Albums a INNER JOIN Singers s ON a.SingerId = s.Id WHERE a.Id = @id");
        }
        else {
            result = await pool.request()
                .query("SELECT a.Id, a.Name, a.Year, s.Name as Singer FROM Albums a INNER JOIN Singers s ON a.SingerId = s.Id ");
        }
        res.send(result.recordset);
        await connection.close();
        return next();
    }
    ;
    async getAlbumsBySinger(req, res, next) {
        let connection = new connection_1.SqlConnection();
        let pool = await connection.open();
        let result = await pool.request()
            .input("singerId", sql.Int, req.params.singerId)
            .query("SELECT a.Id, a.Name, a.Year, s.Name as Singer FROM Albums a INNER JOIN Singers s ON a.SingerId = s.Id WHERE s.Id = @singerId");
        res.send(result.recordset);
        await connection.close();
        return next();
    }
    ;
    async updateAlbum(req, res, next) {
        let connection = new connection_1.SqlConnection();
        let pool = await connection.open();
        let result = await pool.request()
            .input("id", sql.Int, req.body.id)
            .input("name", sql.VarChar(20), req.body.name)
            .input("year", sql.Int, req.body.year)
            .query("UPDATE Albums SET NAME = @name, YEAR = @year WHERE Id = @id");
        await connection.close();
        res.send(200, { "rowsAffected": result.rowsAffected[0] });
        return next();
    }
    async deleteAlbum(req, res, next) {
        let connection = new connection_1.SqlConnection();
        let pool = await connection.open();
        let result = await pool.request()
            .input("id", sql.Int, req.params.id)
            .query("DELETE Albums WHERE ID = @id");
        await connection.close();
        res.send(200, { "rowsAffected": result.rowsAffected[0] });
        return next();
    }
}
exports.Album = Album;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxidW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYWxidW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBNkI7QUFDN0IsNkNBQTZDO0FBRTdDLE1BQWEsS0FBSztJQUNQLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO1FBQ25DLElBQUksVUFBVSxHQUFHLElBQUksMEJBQWEsRUFBRSxDQUFDO1FBQ3JDLElBQUksSUFBSSxHQUFHLE1BQU0sVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRW5DLElBQUksTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sRUFBRTthQUM1QixLQUFLLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDN0MsS0FBSyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzdDLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNyQyxLQUFLLENBQUMscURBQXFELENBQUMsQ0FBQztRQUVsRSxNQUFNLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN6QixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxRCxPQUFPLElBQUksRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFTSxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtRQUNqQyxJQUFJLFVBQVUsR0FBRyxJQUFJLDBCQUFhLEVBQUUsQ0FBQztRQUNyQyxJQUFJLElBQUksR0FBRyxNQUFNLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVuQyxJQUFJLE1BQU0sQ0FBQztRQUNYLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUU7WUFDZixNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFO2lCQUN4QixLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7aUJBQ25DLEtBQUssQ0FBQyx3SEFBd0gsQ0FBQyxDQUFDO1NBQ3hJO2FBQU07WUFDSCxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFO2lCQUN4QixLQUFLLENBQUMsd0dBQXdHLENBQUMsQ0FBQztTQUN4SDtRQUVELEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTNCLE1BQU0sVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUFBLENBQUM7SUFFSyxLQUFLLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO1FBQ3pDLElBQUksVUFBVSxHQUFHLElBQUksMEJBQWEsRUFBRSxDQUFDO1FBQ3JDLElBQUksSUFBSSxHQUFHLE1BQU0sVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRW5DLElBQUksTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sRUFBRTthQUM1QixLQUFLLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7YUFDL0MsS0FBSyxDQUFDLDhIQUE4SCxDQUFDLENBQUM7UUFFM0ksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFM0IsTUFBTSxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekIsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBQUEsQ0FBQztJQUVLLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO1FBQ25DLElBQUksVUFBVSxHQUFHLElBQUksMEJBQWEsRUFBRSxDQUFDO1FBQ3JDLElBQUksSUFBSSxHQUFHLE1BQU0sVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRW5DLElBQUksTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sRUFBRTthQUM1QixLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7YUFDakMsS0FBSyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzdDLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNyQyxLQUFLLENBQUMsNkRBQTZELENBQUMsQ0FBQztRQUUxRSxNQUFNLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN6QixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxRCxPQUFPLElBQUksRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFTSxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtRQUNuQyxJQUFJLFVBQVUsR0FBRyxJQUFJLDBCQUFhLEVBQUUsQ0FBQztRQUNyQyxJQUFJLElBQUksR0FBRyxNQUFNLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVuQyxJQUFJLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUU7YUFDNUIsS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2FBQ25DLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBRTNDLE1BQU0sVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFELE9BQU8sSUFBSSxFQUFFLENBQUM7SUFDbEIsQ0FBQztDQUNKO0FBN0VELHNCQTZFQyJ9