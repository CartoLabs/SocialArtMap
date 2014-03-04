var MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server
	async = require('async');

var mongoClient = new MongoClient(new Server('localhost', 27017,
										{'native_parser' : true}));
var db = mongoClient.db('smd');
var twitterMessage = db.collection("twitterMessage");
var smdSummary = db.collection("smdsummary");

function MongoProcess(){
	this.connectMongo = function(callback){
		mongoClient.open(function(err,mongoClient){
					if (err) {
						return callback(err)
					}else{
						return callback(err,true);
					}
		});
	};

	this.saveRawMessage = function(message, callback){
					console.log("before insert " + "\n" + message.text);
		twitterMessage.insert(message,{'forceServerObjectId':true},function(err,result){
			if (err){
				return callback(err);
			}else{
				return callback(err,result);
			}
		});
			
	};

	this.createSummaryCollection = function (keyword, callback){
		function iterator(value,callback1){
			var insertQuery={"keyword":value, 
								"totalCount":0,
								"spatialCount":0,
								"nonSpatialCount":0,
								"sentiment":{
									"positiveCount":0,
									"negativeCount":0,
									"neutralCount":0,
									"maxScore":0,
									"minScore":0,
									"maxScoreText":"",
									"minScoreText":""}
						};
			smdSummary.insert(insertQuery, function(err,result){
				if (err) {return callback1(err)};
				callback1();
			});
		}

		function done(err){
			if (err){
				return callback(err);
			}
			return callback(err,null)
		}

		async.forEach(keyword.split(","),iterator,done);

	}

	this.findSummaryByKeyword = function(keyword,callback){
		var query = {"keyword": keyword};
		smdSummary.findOne(query, function(err,result){
			if (err){
				return callback(err);
			}else{
				return callback(err, result);
			}
		})
	}

	this.updateSummaryByKeyword = function(message,summary,callback){
		var query = {"keyword": message.keyword};

		var updateFields = {};
		updateFields.totalCount = summary.totalCount+1;
		 message.sentimentScore > 0 ? updateFields["sentiment.positiveCount"]=summary.sentiment.positiveCount+1:
		 			message.sentimentScore==0 ? updateFields["sentiment.neutralCount"]=summary.sentiment.neutralCount+1:
		 					updateFields["sentiment.negativeCount"]=summary.sentiment.negativeCount+1;
		 if (message.sentimentScore > summary.sentiment.maxScore){
		 	updateFields["sentiment.maxScore"] = message.sentimentScore;
		 	updateFields["sentiment.maxScoreText"] = message.text;
		 } else if (message.sentimentScore < summary.sentiment.minScore){
		 	updateFields["sentiment.minScore"] = message.sentimentScore;
		 	updateFields["sentiment.minScoreText"] = message.text;
		 }

		 message.coordinates != null ? updateFields.spatialCount = summary.spatialCount+1 : updateFields.nonSpatialCount = summary.nonSpatialCount+1;



		//console.log(message.keyword + "\n" + message.sentimentScore + "\n" + message.coordinates + "\n" + JSON.stringify(summary));
		smdSummary.update(query, {$set:updateFields}, function(err,result){
			if (err) {return callback(err)};
			return callback(err,result);
		})
	}
}
module.exports = MongoProcess;