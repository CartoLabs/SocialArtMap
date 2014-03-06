/*jslint node:true*/
var port = 3000;
var express = require("express");
var sentiment = require('./server/sentiment');
var Twit = require('./server/twit');
var Summary = require('./server/controllers/summary');
var Message = require('./server/controllers/message');
var MongoProcess = require('./server/mongo');
var moment = require('moment');
var monitoringPhrase = "spring break,white house,snow,ukraine";
var twit = new Twit();
var mongoProcess = new MongoProcess();
var summary = new Summary();
var message = new Message();

var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

//connect to mongo
mongoProcess.connectMongo(function(err, result){
	if (err) {throw err};
//check twitter connection
	// twit.verifyTwitConnection(function(err, data){
	// 	if (err) {throw err};
	// 		mongoProcess.createSummaryCollection(monitoringPhrase, function(err,resultSummary){
	// 			 twit.getTwitStream(monitoringPhrase,function(data){
	// 			 	sentiment.getSentiment(monitoringPhrase,data.text,function(err,resultSentiment){
	// 		             	data.sentimentScore = resultSentiment.score;
	// 		             	data.keyword = resultSentiment.keyword;
	// 		             	data.created_at = new Date(data.created_at);
	// 		             	data.created_at_unix = moment(data.created_at).unix();
	// 		             	//save raw twit
	// 		             	mongoProcess.saveRawMessage(data, function(err,resultSavedTwit){
	// 		             		if (err){throw err};
	// 		             		console.log("saved");
	// 		             	});
	// 		             	//update summary
	// 		             	mongoProcess.findSummaryByKeyword(data.keyword, function(err,resultSummary){
	// 			             		if (err){throw err};
	// 			             		mongoProcess.updateSummaryByKeyword(data,resultSummary,function(err,result){
	// 			             				//console.dir(result);
	// 			             				if (err){throw err};
	// 			             		});
	// 		             	});
	// 		        });
	// 			 });
	// 		});
	// });

});

app.configure(function(){
  app.set('port', port);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.logger('dev'));
  app.use(express.errorHandler());
});

//now the routes
app.get("/", function(req,res){
    res.send('done');
});

app.get("/summary/getKeywordList", summary.getKeywordList);
app.get("/summary/keyword/:keyword", summary.getSummaryByKeyword);
app.get("/message/keyword/:keyword/startDate/:startDate/endDate/:endDate", message.getMessageByKeywordAndDaterange);


app.listen(app.get('port'), function(){
  console.log("Node.js Hosting Test listening on port " + app.get('port') + ', running in ' + app.settings.env + " mode, Node version is: " + process.version);
  //show all the routes that express-resource-new creates for you.
  console.log(app.routes);
});