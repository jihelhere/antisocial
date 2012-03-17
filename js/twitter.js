https://search.twitter.com/search.json?q=Sarkozy%20from:nadine__morano&rpp=1

$(function() {
	getMoranoTweet('sarkozy');
});


function getMoranoTweet(keyword) {
	$.getJSON('https://search.twitter.com/search.json?q='+keyword+'%20from:nadine__morano&rpp=1&callback=?', function(t){
		// t contient un tweet
		if (t.results.length == 0) {
			return'';
		} else {
			return t.results[0].text;
		}
	});
}