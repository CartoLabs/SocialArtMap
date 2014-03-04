/*jslint node:true*/
var port = 3000;
var express = require("express");
var sentiment = require('./sentiment');
//var twitter = require('ntwitter');
var Twit = require('./twit');
var MongoProcess = require('./mongo');
var app = express();
var monitoringPhrase = "spring break, white house, snow, ukraine";
var twit = new Twit();
var mongoProcess = new MongoProcess();

//check twitter connection
twit.verifyTwitConnection(function(err, data){
	if (err) {throw err};

	//connect to mongo
	mongoProcess.connectMongo(function(err, result){
		if (err) {throw err};
			mongoProcess.createSummaryCollection(monitoringPhrase, function(err,resultSummary){
				 twit.getTwitStream(monitoringPhrase,function(data){
				 	sentiment.getSentiment(monitoringPhrase,data.text,function(err,resultSentiment){
			             	data.sentimentScore = resultSentiment.score;
			             	data.keyword = resultSentiment.keyword;
			             	//save raw twit
			             	mongoProcess.saveRawMessage(data, function(err,resultSavedTwit){
			             		if (err){throw err};
			             		console.log("saved");
			             	});
			             	//update summary
			             	mongoProcess.findSummaryByKeyword(data.keyword, function(err,resultSummary){
				             		if (err){throw err};
				             		mongoProcess.updateSummaryByKeyword(data,resultSummary,function(err,result){
				             				//console.dir(result);
				             				if (err){throw err};
				             		});
			             	});
			        });
				 });
			});
	});

});

app.listen(port);
console.log("Server listening on port " + port);