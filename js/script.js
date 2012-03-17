function showLoader(show){
	if (!show){
		$(".spinner").animate({"margin-top": "-=400px"},{duration:500, easing:"easeInElastic",queue:true});
		return;
	}
	// Just in case.
	$(".spinner").remove();
	
	var opts = {
	  lines: 16,
	  length: 30,
	  width: 8,
	  radius: 40,
	  color: '#FFF',
	  speed: 2.2,
	  trail: 10,
	  shadow: false,
	  hwaccel: false,
	  className: 'spinner',
	  zIndex: 2e9,
	  top: 'auto',
	  left: 'auto'
	};
	var spinner = new Spinner(opts).spin();
	$("body").append(spinner.el);
	$(spinner.el).css("position","relative");
	$(spinner.el).css("width","0px");
	$(spinner.el).css("margin","auto");
	$(spinner.el).css("margin-top","-100px");

     $(spinner.el).animate({"margin-top": "+=400px"} ,{duration:500, easing:"easeOutElastic",queue:true});
};

function getNextProp(){
	return {
	text : "lorem ipsum dolor sit amet",
	id : "plop"
	};
}


function showProposition(){
var proposition = getNextProp();	
	$("<div='proposition'></div>")
}

$(document).ready(function() {
	$("body").css("width","100%");
	$("body").css("height","100%");
 	$("body").css("background-color","#74C5E3");	

	showLoader(true);
	showLoader(false);
});







