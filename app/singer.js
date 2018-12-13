"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql = require("mssql");
const connection_1 = require("./connection");
class Singer {
    async insertSinger(req, res, next) {
        let connection = new connection_1.SqlConnection();
        let pool = await connection.open();
        let result = await pool.request()
            .input("name", sql.VarChar(20), req.body.name)
            .input("description", sql.VarChar(300), req.body.description)
            .query("INSERT INTO Singers VALUES (@name, @description)");
        await connection.close();
        res.send(200, { "rowsAffected": result.rowsAffected[0] });
        return next();
    }
    async getSingers(req, res, next) {
        let connection = new connection_1.SqlConnection();
        let pool = await connection.open();
        let result;
        if (req.params.id) {
            result = await pool.request()
                .input("id", sql.Int, req.params.id)
                .query("SELECT Id, Name, Description FROM Singers WHERE ID = @id");
        }
        else {
            result = await pool.request()
                .query("SELECT Id, Name, Description FROM Singers");
        }
        res.send(result.recordset);
        await connection.close();
        return next();
    }
    ;
    async updateSinger(req, res, next) {
        let connection = new connection_1.SqlConnection();
        let pool = await connection.open();
        let result = await pool.request()
            .input("id", sql.Int, req.body.id)
            .input("name", sql.VarChar(20), req.body.name)
            .input("description", sql.VarChar(300), req.body.description)
            .query("UPDATE Singers SET NAME = @name, DESCRIPTION = @description WHERE Id = @id");
        await connection.close();
        res.send(200, { "rowsAffected": result.rowsAffected[0] });
        return next();
    }
    async deleteSinger(req, res, next) {
        let connection = new connection_1.SqlConnection();
        let pool = await connection.open();
        let result = await pool.request()
            .input("id", sql.Int, req.params.id)
            .query("DELETE Singers WHERE ID = @id");
        await connection.close();
        res.send(200, { "rowsAffected": result.rowsAffected[0] });
        return next();
    }
}
exports.Singer = Singer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Npbmdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3Qiw2Q0FBNkM7QUFFN0MsTUFBYSxNQUFNO0lBQ1IsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7UUFDcEMsSUFBSSxVQUFVLEdBQUcsSUFBSSwwQkFBYSxFQUFFLENBQUM7UUFDckMsSUFBSSxJQUFJLEdBQUcsTUFBTSxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFbkMsSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFO2FBQzVCLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUM3QyxLQUFLLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDNUQsS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7UUFFL0QsTUFBTSxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekIsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUQsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7UUFDbEMsSUFBSSxVQUFVLEdBQUcsSUFBSSwwQkFBYSxFQUFFLENBQUM7UUFDckMsSUFBSSxJQUFJLEdBQUcsTUFBTSxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFbkMsSUFBSSxNQUFNLENBQUM7UUFDWCxJQUFJLEdBQUcsQ0FB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