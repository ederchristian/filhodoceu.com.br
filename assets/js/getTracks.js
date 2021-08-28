let request = new XMLHttpRequest();
request.open("GET", "playlist.json", true);

request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    let response = JSON.parse(request.responseText);

    console.log(response);

    let tracksList = document.querySelector(".tracks__item");

    for (let counter = 0; counter < response.tracks.length; counter++) {
      let albums = response.tracks[counter].album.name;
      let albumCovers = response.tracks[counter].album.images[1].url;
      let songs = response.tracks[counter].name;

      tracksList.appendChild(getAlbumCovers(albumCovers));
      tracksList.appendChild(getAlbumns(albums));
      tracksList.appendChild(getSongs(songs));
    }
  }
};

let getAlbumCovers = function (albumCover) {
  let albumCoverItem = document.createElement("img");
  albumCoverItem.src = albumCover;

  document.body.appendChild(albumCoverItem);
  return albumCoverItem;
};

let getAlbumns = function (album) {
  let albumItem = document.createElement("h2");
  let albumTitle = document.createTextNode(album);

  albumItem.appendChild(albumTitle);

  return albumItem;
};

let getSongs = function (song) {
  let songItem = document.createElement("h3");
  let songTitle = document.createTextNode(song);

  songItem.appendChild(songTitle);

  return songItem;
};

request.send();
