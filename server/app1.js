/*jslint node:true*/
var port = 3000;
var express = require("express");
var expressResource = require("express-resource-new");
var sentiment = require('./sentiment');
//var twitter = require('ntwitter');
var Twit = require('./twit');
var MongoProcess = require('./mongo');
var moment = require('moment');
var app = express();
var monitoringPhrase = "spring break,white house,snow,ukraine";
var twit = new Twit();
var mongoProcess = new MongoProcess();
var app = express();

//connect to mongo
mongoProcess.connectMongo(function(err, result){
	if (err) {throw err};
//check twitter connection
	twit.verifyTwitConnection(function(err, data){
		if (err) {throw err};
			mongoProcess.createSummaryCollection(monitoringPhrase, function(err,resultSummary){
				 twit.getTwitStream(monitoringPhrase,function(data){
				 	sentiment.getSentiment(monitoringPhrase,data.text,function(err,resultSentiment){
			             	data.sentimentScore = resultSentiment.score;
			             	data.keyword = resultSentiment.keyword;
			             	data.created_at = new Date(data.created_at);
			             	data.created_at_unix = moment(data.created_at).unix();
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

app.configure(function(){
  app.set('port', port);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.logger('dev'));
  app.use(express.errorHandler());
  // This tells express-mongoose-new where to look for resources
  app.set('controllers', __dirname + '/controllers');
});



// express-resource-new doing its magic here
// see controllers/pets.js
app.resource('summary', function(){
	this.collection.get('getKeywordList');
});
app.resource('message', function(){
	 app.resource('message',{name:"startDate"}, function(){
		app.resource('message',{name:"endDate"})
	})

});


app.listen(app.get('port'), function(){
  console.log("Node.js Hosting Test listening on port " + app.get('port') + ', running in ' + app.settings.env + " mode, Node version is: " + process.version);
  //show all the routes that express-resource-new creates for you.
  console.log(app.routes);
});