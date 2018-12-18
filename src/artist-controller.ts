import sql from "mssql";
import { Next, Request, Response } from "restify";
import * as sqlConnection from "./connection";

export interface IArtist {
	/** Uniquely identifies the artist on the system. */
	id?: number;
	/** The title of the artist */
	title: string;
	/** Describes the artist */
	description: string;
	/** Year which the artist was formed / began his/her career */
	year: Date;
	/** Predominant genre of the artist */
	genre: string;
}

export class ArtistDao {
	public async insert(artist: IArtist): Promise<void> {
		const pool = await sqlConnection.open();

		try {
			await pool.request()
				.input("title", artist.title)
				.input("description", artist.description)
				.input("year", sql.Date, artist.year)
				.input("genre", artist.genre)
				.query("INSERT INTO Artists VALUES (@title, @description, @year, @genre)");
		} finally {
			await sqlConnection.close();
		}
	}

	// public async get(id: number): Promise<IArtist> {
	// 	const pool = await sqlConnection.open();

	// 	try {
	// 		await pool.request()
	// 			.input("title", artist.title)
	// 			.input("description", artist.description)
	// 			.input("year", artist.year)
	// 			.input("genre", artist.genre)
	// 			.query("INSERT INTO Artists VALUES (@title, @description, @year, @genre)");
	// 	} finally {
	// 		await sqlConnection.close();
	// 	}
	// }
}

// tslint:disable-next-line:max-classes-per-file
export class ArtistController {
	constructor(private readonly artistDao: ArtistDao) { }

	public async insertArtist(req: Request, res: Response, next: Next) {
		await this.artistDao.insert(req.body);
		res.send(200);
		return next();
	}

	public async getArtists(req: Request, res: Response, next: Next) {
		const pool = await sqlConnection.open();

		let result;
		if (req.params.id) {
			result = await pool.request()
				.input("id", sql.Int, req.params.id)
				.query("SELECT Id, Name, Description FROM Artists WHERE ID = @id");
		} else {
			result = await pool.request()
				.query("SELECT Id, Name, Description FROM Artists");
		}

		res.send(result.recordset);

		await sqlConnection.close();
		return next();
	}

	public async updateArtist(req: Request, res: Response, next: Next) {
		const pool = await sqlConnection.open();

		const result = await pool.request()
			.input("id", sql.Int, req.body.id)
			.input("name", sql.VarChar(20), req.body.name)
			.input("description", sql.VarChar(300), req.body.description)
			.query("UPDATE Artists SET NAME = @name, DESCRIPTION = @description WHERE Id = @id");

		await sqlConnection.close();
		res.send(200, { rowsAffected: result.rowsAffected[0] });
		return next();
	}

	public async deleteArtist(req: Request, res: Response, next: Next) {
		const pool = await sqlConnection.open();

		const result = await pool.request()
			.input("id", sql.Int, req.params.id)
			.query("DELETE Artists WHERE ID = @id");

		await sqlConnection.close();
		res.send(200, { rowsAffected: result.rowsAffected[0] });
		return next();
	}
}
