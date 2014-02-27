var twitter = require('ntwitter');
exports.getTwitStream = function(){
	var tweeter = new twitter({
	    consumer_key: 've4JBapy3LV9Kzh4TepQ',
	    consumer_secret: 'tlFbEwxiGRpshA63zUY4bEm4MBrlGR29tjcTFU7aqk',
	    access_token_key: '85571635-lzetGhgD1yZTAvHzKXKUqfasw7vvy5lU7iTY6ohHX',
	    access_token_secret: 'iCFXX2ST9V2zmwcedKlOUjLVZvGEbZzvZtAQGixEUHuRo'
	});
	    
	tweeter.verifyCredentials(function (err, data) {
	    	if (err) {console.log("twitter credential fails.");throw err;}
	    	console.log("credential success");
	        //console.log(JSON.stringify(data));
	        getTwits();
	});

	function getTwits(){
		var monitoringPhrase = "spring break, white house";
		var stream;

        stream = tweeter.stream('statuses/filter', {'track': monitoringPhrase}, function (stream) {
            console.log("Monitoring Twitter for " + monitoringPhrase);
            stream.on('data', function (data) {
                // only evaluate the sentiment of English-language tweets
                if (data.lang === 'en' && data.place != null) {
                	console.log(data.text + "\n" + JSON.stringify(data.place) + "\n" + JSON.stringify(data.geo) + "\n" + JSON.stringify(data.coordinates) + "\n" + data.created_at);
                    // sentiment(data.text, function (err, result) {
                    //     tweetCount++;
                    //     tweetTotalSentiment += result.score;
                    // });
                }
            });
        });
    }
}

