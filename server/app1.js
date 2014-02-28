/*jslint node:true*/
var port = 3000;
var express = require("express");
var sentiment = require('./sentiment');
//var twitter = require('ntwitter');
var Twit = require('./twit');
var app = express();
var monitoringPhrase = "spring break, white house";
var twit = new Twit();
twit.verifyTwitConnection(function(err, data){
	if (err) {throw err};
	twit.getTwitStream(monitoringPhrase,function(data){
		//console.log(data.text + "\n" + JSON.stringify(data.place) + "\n" + JSON.stringify(data.geo) + "\n" + JSON.stringify(data.coordinates) + "\n" + data.created_at);
		sentiment.getSentiment(monitoringPhrase,data.text,function(err,result){
            	//console.log(result);
        })
	})

});

app.listen(port);
console.log("Server listening on port " + port);