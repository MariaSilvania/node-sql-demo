const sql = require("mssql");

const config = {
    database: "Spotify",
    password: "Avanade@2018",
    server: "localhost",
    user: "sa",
};

let pool;

exports.open = async function () {
    pool = await new sql.ConnectionPool(config);
    await pool.connect();
    return pool;
}

exports.close = async function () {
    await pool.close();
}
