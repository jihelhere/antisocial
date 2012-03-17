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
	inc++;
	return {
	text : "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ",
	id : ""+inc
	};
}

function hide(id){
    	$("#"+id).animate({"left": "+=2000px"},{duration:500, easing:"easeInOutElastic",queue:false, complete:function(){
			$("#"+id).remove();
		}});
		return;
}

function show(p){
	var proposition = $('<div id="'+p.id+'"><div style="padding:50px">'+p.text+'</div></div>');
	proposition.css("font-size","70px");
	proposition.css("width","100%");
	proposition.css("line-height","70px");
	proposition.css("margin-left","-2000px");
	proposition.css("position","absolute");	
	proposition.css("text-shadow","1px 1px 7px #333");	
	proposition.css("color","#FFFFFF");		
	proposition.attr("id",p.id);
	
	$("body").append(proposition);
		$("#"+p.id).animate({"left": "+=2000px"},{duration:1500, easing:"easeInOutElastic",queue:false, complete:function(){
	}}).delay(1000);
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
	
	$("#take").click(function(){
		hide(currentId);
		var p = getNextProp();
		currentId = p.id;
		show(p);		
	});
});







