
var getAllGames = function() {
    var imageArr = ["images/basketball.jpg", "images/black_hole.jpg", "images/fruit.jpg", "images/globe_basketball.jpg",
                        "images/sky_basketball.jpg", "images/sunglasses_dog.jpg"];

    const url = "https://www.balldontlie.io/api/v1/games";
        fetch(url)
            .then(function(response) {
                return response.json();
            }).then(function(json) {
                console.log(json);
                let results = "";
                results += "<div class='games minor_padding'>";
                for (let i = 0; i < json.data.length; i++) {
                    results += createHTMLForGame(json.data[i], imageArr);
                }
                results += "</div>"

                document.getElementById("gameResults").innerHTML = results;
            }).catch(function(response) {
                document.getElementById("gameResults").innerHTML = "<p>Sorry, no forcast found</p>";
            });
}

var getAllPlayers = function() {
    var imageArr = ["images/basketball.jpg"];

    const url = "https://www.balldontlie.io/api/v1/players";
        fetch(url)
            .then(function(response) {
                return response.json();
            }).then(function(json) {
                console.log(json);

                let results = "";
                results += "<h2>Players</h2>";
                results = "<div class='players minor_padding'>";
                for (var i = 0; i < json.data.length; i++) {
                    results += createHTMLForPlayer(json.data[i], imageArr);
                }
                results += "</div>"

                document.getElementById("playerResults").innerHTML = results;
            }).catch(function(response) {
                document.getElementById("playerResults").innerHTML = "<p>Sorry, no forcast found</p>";
            });
}

var hashTeam = function(teamString, moduloInt) {
    var hash = 1;
    for (var i = 0; i < teamString.length; i++) {
        if (teamString[0] % 2 == 0) {
            if (teamString[1] != null && teamString[1] % 2 == 1) {
                hash += 67;
            } else {
                hash += 86
            }
        }
        hash += hash * teamString.length;
    }

    return hash % moduloInt;
}

var createHTMLForPlayer = function(obj, arr) {
    var hashVal = hashTeam(obj.team.name, arr.length);
    let results = "";
    results += "<div class='player split_in_half'>"
    results += "<div class='player_image'>"
    results += "<img src=" + arr[hashVal] + ">"
    results += "</div>"
    results += "<div class='minor_padding'>"
    results += "<p class = 'playerID'>PlayerID:" + obj.id + "</p>"
    results += "<hr/>"
    results += "<h2>" + obj.first_name + " " + obj.last_name + "</h2>"
    results += "<div class='player_details'>"
    results += "<h5> team:" + obj.team.name + "<h5>"
    results += "<p> height:" + obj.height_feet + " " + obj.height_inches + "</p>"
    results += "<p> weight:" + obj.weight_pounds + "</p>"
    results += "</div>"
    results += "</div>"
    results += "</div>"
    return results;
}

var createHTMLForGame = function(obj, arr) {
    var hashValHome = hashTeam(obj.home_team.name, arr.length);
    var hashValAway = hashTeam(obj.visitor_team.name, arr.length);
    let results = "";
    results += "<div class='game'>"
    results += "<div class='minor_padding split_in_half'>"
    results += "<div class='split_in_half'>"
                    results += "<img class='miniture' src=" + arr[hashValHome] + ">"
                    results += "<img class='miniture' src=" + arr[hashValAway] + ">"
                    results += "</div>"
                    results += '<p>ID:' + obj.id + '</p>';
                    results += "</div>"
                    results += '<h2>' + obj.home_team.abbreviation + " vs " + obj.visitor_team.abbreviation + '</h2>';
                    results += '<h3>' + obj.home_team.name + " vs " + obj.visitor_team.name + '</h3>';
                    results += '<h4>Home team score: ' + obj.home_team_score + "</h4>";
                    results += '<h4>Away team score: ' + obj.visitor_team_score + "</h4>";
                    results += '</div>'
                    return results;
}


document.getElementById("gameSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("gameIDInput").value;

    if (value === "") {
        getAllGames();
        return;
    }

    var imageArr = ["images/basketball.jpg", "images/black_hole.jpg", "images/fruit.jpg", "images/globe_basketball.jpg",
                        "images/sky_basketball.jpg", "images/sunglasses_dog.jpg"];

    if (!isNaN(value)) {
        const url = "https://www.balldontlie.io/api/v1/games/" + value;
        fetch(url)
            .then(function(response) {
                return response.json();
            }).then(function(json) {
                console.log(json);
                let results = "";
                results = "<div class='games minor_padding'>";
                results += createHTMLForGame(json, imageArr);
                results += "</div>"

                document.getElementById("gameResults").innerHTML = results;
            }).catch(function(response) {
                document.getElementById("gameResults").innerHTML = "<p>Sorry, no forcast found</p>";
            });
    }

    else if (true) {
        const url = "https://www.balldontlie.io/api/v1/games";
        fetch(url)
            .then(function(response) {
                return response.json();
            }).then(function(json) {
                console.log(json);
                var games = json.data.filter(function(obj) {
                    if (obj.visitor_team.abbreviation == value || obj.home_team.abbreviation == value) {
                        return true;
                    }
                    return false;
                });
                results = "<div class='games minor_padding'>";
                for (let i = 0; i < games.length; i++) {
                    results += createHTMLForGame(games[i], imageArr);
                }
                results += "</div>"
                document.getElementById("gameResults").innerHTML = results;
                }).catch(function(response) {
                    document.getElementById("gameResults").innerHTML = "<p>Sorry, no forcast found</p>";
                });
    }
  });

  getAllGames();
  getAllPlayers();