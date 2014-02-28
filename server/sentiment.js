var sentiment = require('sentiment');
function getSentiment(keywords, text, callback){
	var sentimentResult = {"keyword":"", "score":0};
	sentiment(text, function(err,result){
		//console.log(text + "\n" + JSON.stringify(result));
		if (err) {
			return callback(err)
		}else{
			keywords.split(",").forEach(function(d){
				if (text.indexOf(d) >=0){
					sentimentResult.keyword = d, sentimentResult.score = result.score;
					return callback(err,sentimentResult);
				}
			})
		}
	})
}
module.exports.getSentiment = getSentiment;
