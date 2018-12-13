import * as sql from "mssql";

export class SqlConnection {

    private config = {
        database: "Spotify",
        password: "Avanade@2018",
        server: "localhost",
        user: "sa",
    };

    private pool;

    public async open() {
        this.pool = await new sql.ConnectionPool(this.config);
        await this.pool.connect();
        return this.pool;
    }

    public async close() {
        await this.pool.close();
    }
}
