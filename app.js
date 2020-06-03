//setup

var express = require("express");
var app = express();

var request = require("request");
var bodyParser = require("body-parser");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

//routing

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/result", (req, res1) => {

    // res1.send("hello");
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + query;
    console.log("query" + query);
    request(url, function(error, res, body) {
        if (!error && res.statusCode == 200) {
            var search = JSON.parse(body);
            search = search["Search"];
            console.log(search);
            res1.render("result", { query: query, search: search });

            // res.send("done");
        }
    });

});

//lsiten

app.listen(3000, function() {
    console.log("movie api is serving...!");
})