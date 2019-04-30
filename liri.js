require("dotenv").config();

// axios package
var axios = require("axios");

// Accessing the keys.js file
var keys = require("./keys.js");

// Spotify node package
var Spotify = require('node-spotify-api');
// grabbing the spotify Client ID & Secret
var spotify = new Spotify(keys.spotify);
// grabbing the omdb Api
var omdbApi = keys.omdb.api

// User command
const userCommand = process.argv[2];

switch (userCommand) {

    case "concert-this":


    break;

    case "spotify-this-song":
    
    break;

    case "movie-this":
    var movieName = process.argv[3]
   
    if (!movieName){
        movieName = 'mr nobody'
    }
 
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey="+ omdbApi;
   
    axios.get(queryUrl).then(
        function(response) {
            console.log("\n----------\n");
            console.log(queryUrl)
            console.log("Movie Title: " + response.data.Title,
            "\nThe movie was released in " + response.data.Year,
            "\nIMDB Rating: " + response.data.imdbRating,
            "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value,
            "\nCountry: " + response.data.Country,
            "\nLanguage: " + response.data.Language,
            "\nMovie Plot: " + response.data.Plot,
            "\nActors: " + response.data.Actors);
            console.log("\n----------\n");
        }
    );
    
    break;

    case "do-what-it-says":
    
    break;
}