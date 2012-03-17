function getTweet(username, keyword) {
	$.getJSON('https://search.twitter.com/search.json?q='+keyword+'%20from:'+username+'&rpp=1&callback=?', function(t){
		// t contient un tweet
		if (t.results.length == 0) {
			return'';
		} else {
			return t.results[0].text;
		}
	});
}