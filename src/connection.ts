import sql from "mssql";

const config = {
	database: "music",
	password: "YourStrong!Passw0rd",
	server: "localhost",
	user: "sa",
};

let pool: sql.ConnectionPool;

export const open = async () => {
	pool = await new sql.ConnectionPool(config);
	await pool.connect();
	return pool;
};

export const close = async () => {
	await pool.close();
};
