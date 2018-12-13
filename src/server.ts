import * as restify from 'restify';
import { Singer } from './singer';
import { Song } from './song';
import { Album } from './album';

let server = restify.createServer();
server.use(restify.plugins.bodyParser());

let singer = new Singer();
let album = new Album();
let song = new Song();

server.put('/singer', singer.insertSinger);
server.get('/singer/:id', singer.getSingers);
server.post('/singer', singer.updateSinger);
server.del('/singer/:id', singer.deleteSinger);

server.put('/album', album.insertAlbum);
server.get('/album/:id', album.getAlbums);
server.get('/albumBySinger/:singerId', album.getAlbumsBySinger);
server.post('/album', album.updateAlbum);
server.del('/album/:id', album.deleteAlbum);

server.put('/song', song.insertSong);
server.get('/song/:id', song.getSongs);
server.get('/songBySinger/:id', song.getSongsBySinger);
server.get('/songByAlbum/:id', song.getSongsByAlbum);
server.post('/song', song.updateSong);
server.del('/song/:id', song.deleteSong);

server.listen(8081, function () {
  console.log('%s listening at %s', server.name, server.url);
});