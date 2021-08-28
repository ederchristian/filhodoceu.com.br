// This file is from: https://github.com/thelinmichael/spotify-web-api-node/blob/master/examples/tutorial/00-get-access-token.js

const dotenv = require("dotenv");
dotenv.config();

var SpotifyWebApi = require("spotify-web-api-node");
const express = require("express");

const scopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "app-remote-control",
  "user-read-email",
  "user-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-modify-private",
  "user-library-modify",
  "user-library-read",
  "user-top-read",
  "user-read-playback-position",
  "user-read-recently-played",
  "user-follow-read",
  "user-follow-modify",
];

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: `${process.env.CLIENT_ID}`,
  clientSecret: `${process.env.CLIENT_SECRET}`,
  redirectUri: "http://localhost:8888/callback",
});

const app = express();

app.get("/login", (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

app.get("/callback", (req, res) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error("Callback Error:", error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      const accessToken = data.body["accessToken"];
      const refreshToken = data.body["refreshToken"];
      const expiresIn = data.body["expiresIn"];

      spotifyApi.setAccessToken(accessToken);
      spotifyApi.setRefreshToken(refreshToken);

      console.log("accessToken:", accessToken);
      console.log("refreshToken:", refreshToken);

      console.log(
        `Sucessfully retreived access token. Expires in ${expiresIn} s.`
      );
      res.send("Success! You can now close the window.");

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const accessToken = data.body["accessToken"];

        console.log("The access token has been refreshed!");
        console.log("accessToken:", accessToken);
        spotifyApi.setAccessToken(accessToken);
      }, (expiresIn / 2) * 1000);
    })
    .catch((error) => {
      console.error("Error getting Tokens:", error);
      res.send(`Error getting Tokens: ${error}`);
    });
});

app.listen(8888, () =>
  console.log(
    "HTTP Server up. Now go to http://localhost:8888/login in your browser."
  )
);
