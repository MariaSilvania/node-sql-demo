import * as sql from 'mssql';

var config = {
    user: 'sa',
    password: 'Avanade@2018',
    server: 'localhost',
    database: 'Tech'
}

export class Technologies {
    public async getTechnologies(req, res, next) {
        let pool = await sql.connect(config);

        let result;
        if (req.params.id) {
            result = await pool.request()
                .input('id', sql.Int, req.params.id)
                    .query('SELECT Id, Name, Description FROM Tech WHERE ID = @id');
        } else {
            result = await pool.request()
                .query('SELECT Id, Name, Description FROM Tech');
        }

        res.send(result.recordset);

        sql.close();
        return next();
    };

    public async insertTechnology(req, res, next) {
        let pool = await sql.connect(config);

        let result = await pool.request()
            .input('name', sql.VarChar(20), req.body.name)
            .input('description', sql.VarChar(20), req.body.description)
            .query('INSERT INTO Tech VALUES (@name, @description)');

        sql.close();
        res.send(200, { "rowsAffected": result.rowsAffected[0] });
        return next();
    }

    public async deleteTechnology(req, res, next) {
        let pool = await sql.connect(config);

        let result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE Tech WHERE ID = @id');

        sql.close();
        res.send(200, { "rowsAffected": result.rowsAffected[0] });
        return next();
    }
}