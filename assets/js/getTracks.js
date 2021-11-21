let request = new XMLHttpRequest();
request.open("GET", "playlist.json", true);

request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    let response = JSON.parse(request.responseText);

    let tracksList = document.querySelector(".tracks__item");

    for (let counter = 0; counter < response.tracks.length; counter++) {
      let albumCovers = response.tracks[counter].album.images[1].url;
      let albumNames = response.tracks[counter].album.name;
      let songNames = response.tracks[counter].name;
      let previews = response.tracks[counter].preview_url;
      let fullSongs = response.tracks[counter].external_urls.spotify;

      tracksList.appendChild(getAlbumCovers(albumCovers));
      tracksList.appendChild(getAlbumns(albumNames));
      tracksList.appendChild(getSongs(songNames));
      tracksList.appendChild(getPreviews(previews));
      tracksList.appendChild(createSineWave(15));
      tracksList.appendChild(getFullSongs(fullSongs));
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

for (let counter = 0; counter < 1; counter++) {
  var getPreviews = function (preview) {
    counter += 1;

    let previewItem = document.createElement("audio");
    previewItem.src = preview;
    previewItem.setAttribute("controls", "");
    previewItem.setAttribute("muted", "muted");

    previewItem.setAttribute("id", `audio-${counter}`);

    document.body.appendChild(previewItem);

    return previewItem;
  };
}

const setAttributes = (element) => (attributes) =>
  Object.keys(attributes).forEach((key) =>
    element.setAttribute(key, attributes[key])
  );

const createSVG = () =>
  document.createElementNS("http://www.w3.org/2000/svg", "svg");
const createFromSVG = (svg) => (name) =>
  document.createElementNS(svg.namespaceURI, name);

const createSineWave = (length) => {
  if (length < 1) return undefined;

  const svg = createSVG(),
    path = createFromSVG(svg)("path");

  setAttributes(svg)({
    viewBox: `0 0 ${length * 100} 100`,
    class: "sine-wave",
  });

  setAttributes(path)({
    class: "sine-wave-path",
    d: `M 0 50${Array(length + 2)
      .fill()
      .map(
        (x, index) =>
          ` Q ${index * 100 + 50} ${index % 2 === 0 ? 0 : 100}, ${
            (index + 1) * 100
          } 50`
      )
      .join("")}`,
  });

  svg.appendChild(path);

  return svg;
};

let getFullSongs = function (fullSong) {
  let songIcon = document.createElement("img");
  songIcon.src = "assets/svg/icon-spotify.svg";
  songIcon.alt = "Ícone logo Spotify";
  songIcon.style = "width: 16px; height: 16px; margin: 0 8px 0 0;";

  let songLink = document.createTextNode("Ouvir música completa");
  let songItem = document.createElement("a");
  songItem.href = fullSong;
  songItem.target = "_blank";
  songItem.rel = "noreferrer noopener";

  songItem.appendChild(songIcon);
  songItem.appendChild(songLink);
  document.body.appendChild(songItem);

  return songItem;
};

request.send();
