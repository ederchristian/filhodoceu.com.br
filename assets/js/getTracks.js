let request = new XMLHttpRequest();
request.open("GET", "playlist.json", true);

request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    let response = JSON.parse(request.responseText);

    console.log(response);

    let tracksList = document.querySelector(".tracks__item");

    for (let counter = 0; counter < response.tracks.length; counter++) {
      let albumCovers = response.tracks[counter].album.images[1].url;
      let albumNames = response.tracks[counter].album.name;
      let songNames = response.tracks[counter].name;
      let previews = response.tracks[counter].preview_url;

      tracksList.appendChild(getAlbumCovers(albumCovers));
      tracksList.appendChild(getAlbumns(albumNames));
      tracksList.appendChild(getSongs(songNames));
      tracksList.appendChild(getPreviews(previews));
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

let getPreviews = function (preview) {
  let previewItem = document.createElement("audio");
  previewItem.src = preview;
  previewItem.setAttribute("controls", "");

  document.body.appendChild(previewItem);

  return previewItem;
};

request.send();
