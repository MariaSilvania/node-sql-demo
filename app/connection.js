"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql = require("mssql");
class SqlConnection {
    constructor() {
        this.config = {
            user: 'sa',
            password: 'Avanade@2018',
            server: 'localhost',
            database: 'Spotify'
        };
    }
    async open() {
        this.pool = await new sql.ConnectionPool(this.config);
        await this.pool.connect();
        return this.pool;
    }
    async close() {
        await this.pool.close();
    }
}
exports.SqlConnection = SqlConnection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25uZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTZCO0FBRTdCLE1BQWEsYUFBYTtJQUExQjtRQUVZLFdBQU0sR0FBRztZQUNiLElBQUksRUFBRSxJQUFJO1lBQ1YsUUFBUSxFQUFFLGNBQWM7WUFDeEIsTUFBTSxFQUFFLFdBQVc7WUFDbkIsUUFBUSxFQUFFLFNBQVM7U0FDdEIsQ0FBQTtJQWFMLENBQUM7SUFUVSxLQUFLLENBQUMsSUFBSTtRQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RELE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVNLEtBQUssQ0FBQyxLQUFLO1FBQ2QsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzVCLENBQUM7Q0FDSjtBQXBCRCxzQ0FvQkMifQ==