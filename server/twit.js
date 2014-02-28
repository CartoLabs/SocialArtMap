var twitter = require('ntwitter');
function Twit(){
		var tweeter = new twitter({
		    consumer_key: 've4JBapy3LV9Kzh4TepQ',
		    consumer_secret: 'tlFbEwxiGRpshA63zUY4bEm4MBrlGR29tjcTFU7aqk',
		    access_token_key: '85571635-lzetGhgD1yZTAvHzKXKUqfasw7vvy5lU7iTY6ohHX',
		    access_token_secret: 'iCFXX2ST9V2zmwcedKlOUjLVZvGEbZzvZtAQGixEUHuRo'
		});
	this.verifyTwitConnection = function(callback){
		tweeter.verifyCredentials(function (err, data) {
		    	if (err) {
		    		return callback(err)
		    	}else{
		    		return callback(err,data);
		    	}

		});
	}

	this.getTwitStream = function(keywords,callback){
		var stream;

        stream = tweeter.stream('statuses/filter', {'track': keywords}, function (stream) {
            console.log("Monitoring Twitter for " + keywords);
            stream.on('data', function (data) {
					if (data.lang === 'en') {
						return callback(data);
					}
                	//console.log(data.text + "\n" + JSON.stringify(data.place) + "\n" + JSON.stringify(data.geo) + "\n" + JSON.stringify(data.coordinates) + "\n" + data.created_at);
                    // sentiment(data.text, function (err, result) {
                    //     tweetCount++;
                    //     tweetTotalSentiment += result.score;
                    // });
            		//sentiment.getSentiment(keywords,data.text,function(err,result){
            		//	console.log(result);
            		//})
                
            });
        });
    }

}
module.exports = Twit;


