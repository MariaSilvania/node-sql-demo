import sql from "mssql";
import { Next, Request, Response } from "restify";
import * as sqlConnection from "./connection";

export class AlbumController {
	public async insertAlbum(req: Request, res: Response, next: Next) {
		const pool = await sqlConnection.open();

		const result = await pool.request()
			.input("artistId", sql.Int, req.body.artistId)
			.input("name", sql.VarChar(20), req.body.name)
			.input("year", sql.Int, req.body.year)
			.query("INSERT INTO Albums VALUES (@artistId, @name, @year)");

		await sqlConnection.close();
		res.send(200, { rowsAffected: result.rowsAffected[0] });
		return next();
	}

	public async getAlbums(req: Request, res: Response, next: Next) {
		const pool = await sqlConnection.open();

		let result;
		if (req.params.id) {
			result = await pool.request()
				.input("id", sql.Int, req.params.id)
				.query(`
					SELECT a.Id, a.Name, a.Year, s.Name as Artist
					FROM Albums a INNER JOIN Artists s ON a.ArtistId = s.Id
					WHERE a.Id = @id`);
		} else {
			result = await pool.request()
				.query(`
					SELECT a.Id, a.Name, a.Year, s.Name as Artist
					FROM Albums a INNER JOIN Artists s ON a.ArtistId = s.Id`);
		}

		res.send(result.recordset);

		await sqlConnection.close();
		return next();
	}

	public async getAlbumsByArtist(req: Request, res: Response, next: Next) {
		const pool = await sqlConnection.open();

		const result = await pool.request()
			.input("artistId", sql.Int, req.params.artistId)
			.query(`
				SELECT a.Id, a.Name, a.Year, s.Name as Artist
				FROM Albums a INNER JOIN Artists s ON a.ArtistId = s.Id
				WHERE s.Id = @artistId`);

		res.send(result.recordset);

		await sqlConnection.close();
		return next();
	}

	public async updateAlbum(req: Request, res: Response, next: Next) {
		const pool = await sqlConnection.open();

		const result = await pool.request()
			.input("id", sql.Int, req.body.id)
			.input("name", sql.VarChar(20), req.body.name)
			.input("year", sql.Int, req.body.year)
			.query("UPDATE Albums SET NAME = @name, YEAR = @year WHERE Id = @id");

		await sqlConnection.close();
		res.send(200, { rowsAffected: result.rowsAffected[0] });
		return next();
	}

	public async deleteAlbum(req: Request, res: Response, next: Next) {
		const pool = await sqlConnection.open();

		const result = await pool.request()
			.input("id", sql.Int, req.params.id)
			.query("DELETE Albums WHERE ID = @id");

		await sqlConnection.close();
		res.send(200, { rowsAffected: result.rowsAffected[0] });
		return next();
	}
}
