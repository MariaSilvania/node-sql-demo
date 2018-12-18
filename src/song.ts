import sql from "mssql";
import { Next, Request, Response } from "restify";
import * as sqlConnection from "./connection";

export class SongController {

	public async insertSong(req: Request, res: Response, next: Next) {
		const pool = await sqlConnection.open();

		const result = await pool.request()
			.input("albumId", sql.Int, req.body.albumId)
			.input("name", sql.VarChar(20), req.body.name)
			.input("composer", sql.VarChar(300), req.body.composer)
			.query("INSERT INTO Songs VALUES (@albumId, @name, @composer)");

		await sqlConnection.close();
		res.send(200, { rowsAffected: result.rowsAffected[0] });
		return next();
	}

	public async getSongs(req: Request, res: Response, next: Next) {
		const pool = await sqlConnection.open();

		let result;
		if (req.params.id) {
			result = await pool.request()
				.input("id", sql.Int, req.params.id)
				.query(`
					SELECT
						so.Id,
						so.Name,
						si.Name as Artist,
						so.Composer,
						a.Name as Album,
						a.Year,
					FROM
						Songs so INNER JOIN
						Albums a ON so.AlbumId = a.Id INNER JOIN
						Artists si on si.Id = a.ArtistId
					WHERE
						so.ID = @id`);
		} else {
			result = await pool.request()
				.query(`
					SELECT
						so.Id,
						so.Name,
						si.Name as Artist,
						so.Composer,
						a.Name as Album,
						a.Year
					FROM
						Songs so INNER JOIN
						Albums a ON so.AlbumId = a.Id INNER JOIN
						Artists si on si.Id = a.ArtistId `);
		}

		res.send(result.recordset);

		await sqlConnection.close();
		return next();
	}

	public async getSongsByArtist(req: Request, res: Response, next: Next) {
		const pool = await sqlConnection.open();

		const result = await pool.request()
			.input("id", sql.Int, req.params.id)
			.query(`
				SELECT
					so.Id,
					so.Name,
					si.Name as Artist,
					so.Composer,
					a.Name as Album,
					a.Year
				FROM
					Songs so INNER JOIN
					Albums a ON so.AlbumId = a.Id INNER JOIN
					Artists si on si.Id = a.ArtistId
				WHERE
					si.ID = @id`);

		res.send(result.recordset);

		await sqlConnection.close();
		return next();
	}

	public async getSongsByAlbum(req: Request, res: Response, next: Next) {
		const pool = await sqlConnection.open();

		const result = await pool.request()
			.input("id", sql.Int, req.params.id)
			.query(`
			SELECT
				so.Id,
				so.Name,
				si.Name as Artist,
				so.Composer,
				a.Name as Album,
				a.Year
			FROM
				Songs so INNER JOIN
				Albums a ON so.AlbumId = a.Id INNER JOIN
				Artists si on si.Id = a.ArtistId
			WHERE
				a.ID = @id`);

		res.send(result.recordset);

		await sqlConnection.close();
		return next();
	}

	public async updateSong(req: Request, res: Response, next: Next) {
		const pool = await sqlConnection.open();

		const result = await pool.request()
			.input("id", sql.Int, req.body.id)
			.input("name", sql.VarChar(20), req.body.name)
			.input("composer", sql.VarChar(300), req.body.composer)
			.query("UPDATE Songs SET NAME = @name, COMPOSER = @composer WHERE Id = @id");

		await sqlConnection.close();
		res.send(200, { rowsAffected: result.rowsAffected[0] });
		return next();
	}

	public async deleteSong(req: Request, res: Response, next: Next) {
		const pool = await sqlConnection.open();

		const result = await pool.request()
			.input("id", sql.Int, req.params.id)
			.query("DELETE Songs WHERE ID = @id");

		await sqlConnection.close();
		res.send(200, { rowsAffected: result.rowsAffected[0] });
		return next();
	}
}
