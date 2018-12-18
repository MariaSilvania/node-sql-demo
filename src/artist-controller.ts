import sql from "mssql";
import { Next, Request, Response } from "restify";
import * as sqlConnection from "./connection";

export class Artist {
	constructor(
		/** The title of the artist */
		public title: string,
		/** Describes the artist */
		public description: string,
		/** Year which the artist was formed / began his/her career */
		public year: Date,
		/** Predominant genre of the artist */
		public genre: string,
		/** Uniquely identifies the artist on the system. */
		public id?: number,
	) {
		if (title == null || title.trim() === "") {
			throw new Error(`Title '${title}' is invalid.`);
		}

		if (description == null || description.trim() === "") {
			throw new Error(`Description '${description}' is invalid.`);
		}
	}
}
// tslint:disable-next-line:max-classes-per-file
export class ArtistDao {
	public async insert(artist: Artist): Promise<void> {
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
		const body = req.body;

		let artist: Artist;

		try {
			artist = new Artist(body.title, body.description, body.year, body.genre);
		} catch (e) {
			res.send(400, e);
			return next();
		}

		await this.artistDao.insert(artist);
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
