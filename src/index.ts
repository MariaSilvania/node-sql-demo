import restify from "restify";
import { AlbumController } from "./album";
import { ArtistController, ArtistDao } from "./artist-controller";
import { SongController } from "./song";

const server = restify.createServer();
server.use(restify.plugins.bodyParser());

const album = new AlbumController();
const artist = new ArtistController(new ArtistDao());
const song = new SongController();

/*
/artist/id/album/id/number

/artist <- lista de artistas
/artist/id <- unico artista
	{
		title: "Ventania",
		description: "Doidão",
		year: Date(1998),
		genre: "alternative",
		albums: [
			{
				//
			},
			{
				//
			},
			{
				// 
			}
		]
	}
*/
server.get("/artist", artist.getArtists);
server.get("/artist/:artistId", artist.getArtists);
server.put("/artist/:artistId", artist.insertArtist);
server.post("/artist/:artistId", artist.updateArtist);
server.del("/artist/:artistId", artist.deleteArtist);

server.get("/artist/:artistId/album/:albumId", album.getAlbums);
server.get("/artist/:artistId/album", album.getAlbums);
server.put("/album", album.insertAlbum);
server.get("/albumByArtist/:artistId", album.getAlbumsByArtist);
server.post("/album", album.updateAlbum);
server.del("/album/:id", album.deleteAlbum);

server.put("/song", song.insertSong);
server.get("/song/:id", song.getSongs);
server.get("/songByArtist/:id", song.getSongsByArtist);
server.get("/songByAlbum/:id", song.getSongsByAlbum);
server.post("/song", song.updateSong);
server.del("/song/:id", song.deleteSong);

server.listen(8081, function run() {
	// tslint:disable-next-line:no-console
	console.log("%s listening at %s", server.name, server.url);
});
