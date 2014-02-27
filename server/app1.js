/*jslint node:true*/
var port = 3000;
var express = require("express");
var sentiment = require('sentiment');
var twitter = require('ntwitter');
var twit = require('./twit');

var app = express();

twit.getTwitStream();
//getTwitStream = new twit();
//console.log(twit.tweeter);

//app.listen(port);
//console.log("Server listening on port " + port);