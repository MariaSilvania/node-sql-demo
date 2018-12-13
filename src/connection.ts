import * as sql from 'mssql';

export class SqlConnection {

    private config = {
        user: 'sa',
        password: 'Avanade@2018',
        server: 'localhost',
        database: 'Spotify'
    }

    public async open() {
        let pool = await sql.connect(this.config);
        return pool;
    }

    public async close() {
        await sql.close();
    }
}