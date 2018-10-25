require("dotenv").config();
var inquirer = require("inquirer");
var request = require("request");
var keys = require("./keys");
var fs = require("fs");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

inquirer
    .prompt([{

        name: "choice",
        type: "list",
        message: "Would you like to search by concert-this, spotify-this-song,movie-this or do-what-it-says?",
        choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
    }])
        .then(function (response) {
        if (response.choice === "concert-this") {
            inquirer.prompt([{
                    name: "concert",
                    type: "input",
                    message: "What concert are you looking for?"
                }])
                .then(function (Artist) {
                    console.log(Artist);
                    var queryURL = "https://rest.bandsintown.com/artists/" + Artist.artist + "/events?app_id=1codingbootcamp";
                    console.log(queryURL);
                    request(queryURL, function (error, body) {
                        fs.writeFile("./random.txt", body, function (err) {
                            if (err) {
                                return console.log(error);
                            }
                            // Otherwise, it will print: "movies.txt was updated!"
                            console.log(body);

                        });

                    });
                });
        }   else if (response.choice === "spotify-this-song") {
            inquirer.prompt([{
                    name: "song",
                    type: "input",
                    message: "What song are you looking for?"
                }])
                .then(function (songName) {
                    spotify.search({
                            type: "track",
                            query: songName
                        },
                        function (err, data) {
                            if (err) {
                                console.log("Error occurred: " + err);
                                return;
                            }

                            var songs = data.tracks.items;

                            for (var i = 0; i < songs.length; i++) {
                                console.log(i);
                                //   console.log("artist(s): " + songs[i].song.map());
                                console.log("song name: " + songs[i].name);
                                console.log("preview song: " + songs[i].preview_url);
                                console.log("album: " + songs[i].album.name);
                                console.log("-----------------------------------");
                            }

                        });
                })
            }
            else if (response.choice === "movie-this") {
                inquirer.prompt([{
                        name: "movie",
                        type: "input",
                        message: "What movie are you looking for?"
                    }])
                    .then(function (movieName) {
                        var movieUrl ="http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

                        request(movieUrl, function(error, body) {
                            // if (!error && response.statusCode === 200) {
                                console.log(body);
                            //   var jsonData = JSON.parse(body);
                        
                              console.log("Title: " + body.Title);
                              console.log("Year: " + body.Year);
                              console.log("Rated: " + body.Rated);
                              console.log("Rating: " + body.imdbRating);
                              console.log("Country: " + body.Country);
                              console.log("Language: " + body.Language);
                              console.log("Plot: " + body.Plot);
                              console.log("Actors: " + body.Actors);
                            //   console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
                           // }
                          });
                        
                    })
                }
        });