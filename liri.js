// dontenv package
require("dotenv").config();

// Core node package for reading and writing files
var fs = require("fs");

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

// moment package
var moment = require("moment");

// User command
var userCommand = process.argv[2];

var userInput = process.argv[3];

var log = userCommand + " " + userInput + "\n"

function userQuery (userCommand, userInput) {
    switch (userCommand) {

        // Grabbing the concertThis function and displaying 5 of the artist's concert details 
        case "concert-this":
            concertThis (userInput);
            logIt();
        break;
        
        // grabbing the spotifyThis function and searching for song info and limiting the search to 5 
        case "spotify-this-song":
            spotifyThis(userInput);
            logIt();
        break;

        // Grabbing the omdb api and displaying the info
        case "movie-this":
            movieThis(userInput);
            logIt();
        break;

        // taking the text inside of random.txt and then using it to call one of LIRI's commands.
        case "do-what-it-says":
            doWhatItSays(userInput);
        break;

        // default will be asking the user to select one of the other user commands
        default:
        console.log("Choose one of the following commands: \n1. concert-this\n2. spotify-this-song\n3. movie-this\n4. do-what-it-says");
        console.log("\n----------\n");
        break;
    }

};

// Calling the userQuery function
userQuery (userCommand, userInput);

// Grabbing the Bands in Town Api
function concertThis() {
    // User's input of the Artist or Band name
    var artist = userInput;
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios.get(queryUrl).then(
        function(response) {
            console.log("Artist: " + artist);
            console.log("\n----------\n");
            for (var i = 0; i < 5;i++) {
                console.log("Venue: " + response.data[i].venue.name,
                "\nLocation: " + response.data[i].venue.city + ", " + response.data[i].venue.country,
                "\nDate of the event: " + moment(response.data[i].datetime).format('L'));
                console.log("\n----------\n");
            }
        }
    );   
}

// grabbing the spotify api using the node package
function spotifyThis() {
    // user's input of the song name
    var song = userInput;
    // if no song is selected
    if (!song){
        song = 'The ace of base the sign'
    }
    spotify
        .search({ type: 'track', query: song, limit: '5' })
        .then(function(data) {
        for (i = 0; i < data.tracks.items.length; i++) {
            console.log("Artist(s): ", data.tracks.items[i].album.artists[0].name);
            console.log("Song: ", data.tracks.items[i].name);
            console.log("Spotify link: ", data.tracks.items[i].external_urls.spotify);
            console.log("Album: ", data.tracks.items[i].album.name);
            console.log("\n----------\n");
        };
        })
        .catch(function(err) {
            console.log(err);
    });
}

function movieThis() {
    // User's input of the movie name
    var movieName = userInput;
    // if user doesn't inpit a movie name
    if (!movieName){
        movieName = 'mr nobody'
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey="+ omdbApi;
    axios.get(queryUrl).then(
        function(response) {
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
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
        return console.log(error);
        }
        
        // Splitting the command and input in random.txt
        var dataArr = data.split(",");

        userCommand = dataArr[0];
        userInput = dataArr[1];
        
        userQuery(userCommand, userInput);
    
    
    });
}
function logIt() {
fs.appendFile("log.txt", log, function(err) {

    // If an error was experienced we will log it.
    if (err) {
      console.log(err);
    }
  
    // If no error is experienced, content is added to log.txt.
    else {
      console.log("User Command logged in log.txt!");
      console.log("\n----------\n");
    }
  });
}
