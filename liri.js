require("dotenv").config();

//request to get Apis from OMDb and Bands in town
var omdb = "http://www.omdbapi.com/?i=tt3896198&apikey=c9e34e2";
// inquiring teh package
var inquirer = require("inquirer");
//request to get the keys.js page
var keys = require("./keys.js");
//getting spotify (as descibed in the HW instructions)
// var spotify = new Spotify(keys.spotify);
//testing the work
console.log(keys);
// check user input

//ask questions
// Write code here to parse command line arguments and store them into variables
// Add code to print whether the user is searching for an actor or concert-this, along with the name of the actor or concert-this they are searching for

var inquirer = require("inquirer");
var request = require("request");
var fs = require("fs");

inquirer
    .prompt([{
        name: "choice",
        type: "list",
        message: "Would you like to search by concert-this, search by spotify-this-song, or create your own?",
        choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
    }])
    .then(function (response) {
            if (response.choice === "concert-this") {
                inquirer.prompt([{
                        name: "tvshow",
                        type: "input",
                        message: "What concert-this are you looking for?"
                    }])
                    .then(function (TV_Show) {

                        var queryURL = `http://api.tvmaze.com/search/shows?q=${TV_Show.tvshow}`;
                        request(queryURL, function (error, response, body) {
                            fs.writeFile("./text.txt", body, function (err) {
                                if (err) {
                                    return console.log(err);
                                }

                                // Otherwise, it will print: "movies.txt was updated!"
                                console.log("Success!");

                            });
                        })

                    })
            } else if (response.choice === "spotify-this-song") {
                inquirer.prompt([{
                    name: "spotify-this-song",
                    type: "input",
                    message: "Which actor or actress are you looking for?"
                }]);
            } else if (response.choice === "movie-this") {
                inquirer.prompt([{
                            name: "show_name",
                            type: "input",
                            message: "What's the name of your concert-this?"
                        },
                        {
                            name: "year_produced",
                            type: "input",
                            message: "What year was your show produced?"
                        },
                        {
                            name: "genre",
                            type: "input",
                            message: "What genre is your show?"
                        },
                        {
                            name: "summary",
                            type: "input",
                            message: "What's the basic plot of your show?"
                        }
                    ])
                    .then(function (answers) {
                        function createTVshow(show_name, year_produced, genre, summary) {
                            //create concert-this
                            this.show_name = show_name;
                            this.year_produced = year_produced;
                            this.genre = genre;
                            this.summary = summary;
                        }

                        var newShow = new createTVshow(answers.show_name, answers.year_produced,
                            answers.genre, answers.summary);
                        console.log(newShow);
                    })
            } else if (response.choice === "do-what-it-says") {
                inquirer.prompt([{
                        name: "spotify-this-song",
                        type: "input",
                        message: "Which actor or actress are you looking for?"
                    }])
                    .then(function (answers) {
                        function createTVshow(show_name, year_produced, genre, summary) {
                            //create concert-this
                            this.show_name = show_name;
                            this.year_produced = year_produced;
                            this.genre = genre;
                            this.summary = summary;
                        }

                        var newShow = new createTVshow(answers.show_name, answers.year_produced,
                            answers.genre, answers.summary);
                        console.log(newShow);
                    })

            } else {
                console.log("wrong input");
            };


            var userInput = process.argv.splice(3).join(" ");


            function createTVactor_actress(
                actor_or_actress_name,
                age,
                gender,
                birth_country
            ) {
                //create actor or actress
                this.actor_or_actress_name, this.age, this.gender, this.birth_country;
            }