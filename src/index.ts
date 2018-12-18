import restify from "restify";
import { AlbumController } from "./album";
import { ArtistController } from "./artist-controller";
import { SongController } from "./song";

const server = restify.createServer();
server.use(restify.plugins.bodyParser());

const album = new AlbumController();
const artist = new ArtistController();
const song = new SongController();

server.put("/artist", artist.insertArtist);
server.get("/artist/:id", artist.getArtists);
server.post("/artist", artist.updateArtist);
server.del("/artist/:id", artist.deleteArtist);

server.put("/album", album.insertAlbum);
server.get("/album/:id", album.getAlbums);
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
