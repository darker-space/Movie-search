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

    var q = req.query.search;

    var url="https://api.themoviedb.org/3/search/movie?api_key=<key>&query="+q;
    console.log(url);
    request(url, function(error, res, body) {
        if (!error && res.statusCode == 200) {
            var search = JSON.parse(body);
            console.log(search);
            search = search["results"];
           // console.log(search);
            res1.render("result", { query: q, search: search,page:1 });

        }
    });

});
app.get("/result2", (req, res1) => {

    var q = req.query.q;
    var q2 =req.query.page1;
    var url="https://api.themoviedb.org/3/search/movie?api_key=<key>&query="+q+"&page="+q2;
    console.log(url);
    request(url, function(error, res, body) {
        if (!error && res.statusCode == 200) {
            var search = JSON.parse(body);
            console.log(search);
            search = search["results"];
           // console.log(search);
            res1.render("result", { query: q, search: search,page:q2 });

        }
    });

});

app.get("/movie", (req, res1) => {

   
    var q = req.query.movie1;
    var url="https://api.themoviedb.org/3/movie/"+q+"?api_key=<key>&append_to_response=videos";
    console.log(url);
    request(url, function(error, res, body) {
        if (!error && res.statusCode == 200) {
            var search = JSON.parse(body);
            console.log(search);
            res1.render("movie", {query: q, movie: search });

        }
    });

});
//lsiten

app.listen(process.env.PORT || 3000, function() {
    console.log("Server started!......");
})
