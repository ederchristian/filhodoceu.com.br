const dotenv = require("dotenv");
dotenv.config();

const fs = require("fs");
const SpotifyWebApi = require("spotify-web-api-node");
const token = process.env.TOKEN;

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    getUserPlaylists(me.body.id);
  })().catch((e) => {
    console.error(e);
  });
}

async function getUserPlaylists(userName) {
  const data = await spotifyApi.getUserPlaylists(userName);

  let playlists = [];

  for (let playlist of data.body.items) {
    let tracks = await getPlaylistTracks(playlist.id, playlist.name);

    const tracksJSON = { tracks };
    let data = JSON.stringify(tracksJSON);
    fs.writeFileSync(playlist.name + ".json", data);
  }
}

async function getPlaylistTracks(playlistId, playlistName) {
  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 100,
    fields: "items",
  });

  let tracks = [];

  for (let track_obj of data.body.items) {
    const track = track_obj.track;
    tracks.push(track);
  }

  return tracks;
}

getMyData();
