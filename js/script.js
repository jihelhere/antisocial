var currentId = 0;
var inc = 0;
function showLoader(show){
	if (!show){
		$(".spinner").animate({"margin-top": "-=400px"},{duration:500, easing:"easeInElastic",queue:true, complete:function(){
				$(".spinner").remove();
		}});
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
	$(spinner.el).css("position","absolute");
	$(spinner.el).css("width","0px");
	$(spinner.el).css("margin","auto");
	$(spinner.el).css("margin-top","-100px");
	$(spinner.el).css("margin-left","50%");

     $(spinner.el).animate({"margin-top": "+=400px"} ,{duration:500, easing:"easeOutElastic",queue:true});
};

function getNextProp(){
	currentId ++;
	return {
		text : "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ",
		id : currentId,
	};
}

function show(p){
	var proposition = $('<div id="'+p.id+'" class="proposition"><p>'+p.text+'</p></div>');
	proposition.css({left:-$(window).width()-50});
	// proposition.css('left',-$(window).width()-50);
	$("body").append(proposition);
	
	$("#"+p.id).animate({"left": "0"},{duration:500, queue:false, complete:function(){
	
	}});
}

$(document).ready(function() {
	$("body").append("<div class='progressbar' style='position:fixed;top:left;right:0px;width:300px;height:30px'></div>");
	$(".progressbar").progressbar({
			value: 37
		});
	$("#progressbar .ui-progressbar-value").addClass("ui-corner-right");
	$("#progressbar .ui-progressbar-value").animate({width: 300}, 'slow')
	
	$("body").css("height","100%");
	$("body").css("overflow","hidden");
 	$("body").css("background-color","#74C5E3");	

	//showLoader(true);
	//showLoader(false);
	
	$(".button-response").click(function(){
		var $this = $(this);
		if($this.attr('id') == "take") {
			// Incrémente la valeur du candidat X
				// On récupère X en fonction de l'id de la proposition
		} else {
			// Désincrémente la valeur du candidat X
				// Idem pour l'id
		}
		slide();
	});
});

function slide() {
		$("#"+currentId).animate({"left": $(window).width()+50},{duration:200, easing:"swing",queue:false, complete:function(){
			$(this).remove();
			var p = getNextProp();
			show(p);
		}});
}