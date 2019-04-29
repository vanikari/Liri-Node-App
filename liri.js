require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

const action = process.argv[2];

switch (action) {

    case "concert-this":

    break;

    case "spotify-this-song":
    
    break;

    case "movie-this":
    
    break;

    case "do-what-it-says":
    
    break;
}