const restify = require("restify");
const album = require("./album");
const singer = require ("./singer");
const song = require("./song");

const server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.put("/singer", singer.insertSinger);
server.get("/singer/:id", singer.getSingers);
server.post("/singer", singer.updateSinger);
server.del("/singer/:id", singer.deleteSinger);

server.put("/album", album.insertAlbum);
server.get("/album/:id", album.getAlbums);
server.get("/albumBySinger/:singerId", album.getAlbumsBySinger);
server.post("/album", album.updateAlbum);
server.del("/album/:id", album.deleteAlbum);

server.put("/song", song.insertSong);
server.get("/song/:id", song.getSongs);
server.get("/songBySinger/:id", song.getSongsBySinger);
server.get("/songByAlbum/:id", song.getSongsByAlbum);
server.post("/song", song.updateSong);
server.del("/song/:id", song.deleteSong);

server.listen(8081, function run() {
  console.log("%s listening at %s", server.name, server.url);
});
