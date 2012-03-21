$(function() {

  var propos = [];
  var candis = [];
  var inc = 0;
  var propos_displayed = [];
  var random = 0;
  var NB_QUESTIONS = 27;
  var QUESTIONS = [];
  var intervalSetter = 0;
  var timer = 8000;
  var moving = false;

  var id_candidacies = [
    '4f1ec52e6e27d70001000007',
    '4f1eddf96e27d7000100008b',
    '4f2c143202b7400005000029',
    '4f1888db5c664f0001000119',
    '4f188a59f8104a0001000004',
    '4f1887545c664f000100010f',
    '4f1888945c664f0001000116',
    '4f188a20f8104a0001000002',
    '4f242b3269b233000100002b'
  ];

  var candidats = [
    'Nathalie Arthaud',
    'Francois Bayrou',
    'Jacques Cheminade',
    'Nicolas Dupont-Aignan',
    'Francois Hollande',
    'Eva Joly',
    'Marine Le Pen',
    'Jean-Luc Melenchon',
    'Nicolas Sarkozy'
  ];
  
  function preloadImage(arrayOfImages) {
    $(arrayOfImages).each(function() {
        $('<img/>')[0].src = this;
    });
  }

  preloadImage([
    'img/Nathalie Arthaud.png',
    'img/Francois Bayrou.png',
    'img/Jacques Cheminade.png',
    'img/Nicolas Dupont-Aignan.png',
    'img/Francois Hollande.png',
    'img/Eva Joly.png',
    'img/Marine Le Pen.png',
    'img/Jean-Luc Melenchon.png',
    'img/Nicolas Sarkozy.png',
    'img/nadine.png'
  ]);
  
  function getJSON() {
    showLoader(true);

    for (candidat in all) {
      for (var i = 0; i < all[candidat].response.propositions.length; i++) {
        propos.push(all[candidat].response.propositions[i].text);
        candis.push(all[candidat].response.propositions[i].candidacy.id);
      }
    }

    showLoader(false);
  }

  function getRandom(size) { return Math.floor(Math.random()*size); }

  function getSentence(text) {
    var sentences = text.split(".");
    var idx = getRandom(sentences.length - 1) ;
    return sentences[idx] + ".";
  }

  function getPropos() {
    random = getRandom(propos.length);
    return {text: getSentence(propos[random]), id: candis[random]};
  }

  function prepare_game_set(size) {
    var res = [];
    for (var i = 0; i < size; i++) {
      var propos = getPropos();
      while (propos.text.length < 10) {
        propos = getPropos();
      }
        res.push(propos);
    }
    return res;
  }

  function get_next_question() {
      if (inc < QUESTIONS.length)
          return QUESTIONS[inc++];
      else {
          inc = 0;
          return null;
      }
  }

  function getCandidate(id) {
      for (var i = 0; i < candidats.length; i++) {
          if (id_candidacies[i] == id) return candidats[i];
      }
  }

  function ifTakeClicked() {
      var str = QUESTIONS[inc-1].id
      if(propos_displayed[str] == null) propos_displayed[str] = 0;
      propos_displayed[str] = propos_displayed[str] + 1;
  }

  //---------------------
  //---------------------
  //---------------------

  function showLoader(show) {
    if (!show) {
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
    $("#text").html(spinner.el);
    $(spinner.el).css("position","absolute");
    $(spinner.el).css("width","0px");
    $(spinner.el).css("margin","auto");
    $(spinner.el).css("margin-top","-100px");
    $(spinner.el).css("margin-left","50%");

    $(spinner.el).animate({"margin-top": "+=400px"} ,{duration:500, easing:"easeOutElastic",queue:true});
  };

  function hide(id) {
    $("#"+id).animate({"left": "+=2000px"},{duration:500, easing:"easeInOutElastic", queue:false, complete:function(){
      $("#"+id).remove();
    }});
  return;
  }

  function show(p){
    var proposition = $('<div id="'+p.id+'" class="proposition"><p>'+p.text+'</p></div>');
    proposition.css({left:-$(window).width()-50});
    $("body").append(proposition);
    $("#"+p.id).animate({"left": "0"},{duration:500, queue:false, complete:function(){
      moving = false;
      startTimer();
    }});
  }

  //---------------------
  //---------------------
  //---------------------
  
  getJSON();

  $('#buttons-response').show();
	
	$('#commencer').live('click', function(event) {
		diffBottom = $(window).height() + 20;
		$('#splash').animate({'margin-top':'+='+diffBottom}, 300, function() {
			$('#splash').remove();
			startApp();
		})
		event.preventDefault();
	});

	$("#buttons-response .button-response").live('click',function(event){
		if (!moving) {
			slide();
			var $this = $(this);
			if ($this.attr('id') == "take") {
				ifTakeClicked();
			}
			reinitTimer();
			event.preventDefault();
		}
	});

	function slide() {
    moving = true;
    $(".proposition").animate(
      {"left": $(window).width()+50},
      {duration: 200, easing: "swing", queue: false, complete: function() {
        $(this).remove();
        
        var p = get_next_question();
        
        if (p)
          show(p);
        else {
          var gagnant_id = gameFinished();
          var gagnant_name = getCandidate(gagnant_id);
          var answer;
          
          answer = (!gagnant_name) ? '' : 'Votre vote instinctif';

          resultat = $('<div style="margin-top:50px;" id="'+gagnant_id+'" class="result"><p style="text-align:center">'+ answer + '</p></div>');
          
          $('body').append(resultat);

          var img_filename;
          
          img_filename = (gagnant_name) ? 'img/' + getCandidate(gagnant_id) + '.png' : 'img/nadine.png';

          var img = $('<div class="result_img" style="text-align:center;margin-top:20px"><img width="300" height="200" src="' + img_filename + '" /></div>');

          $('body').append(img);

          var answer;
          
           answer = (!gagnant_name) ? 'Le 22 avril, restez chez vous !' : gagnant_name;

          resultat = $('<div style="" id="'+gagnant_id+'" class="result"><p style="text-align:center">'+ answer + '</p></div>');

          $('body').append(resultat);

          $('body').append('<a href="#" style="display: block;position: fixed;left: 50%;margin-left: -92px;bottom:20px" class="button-response" id="recommencer">Recommencez</a>');
        
          $('#recommencer').live('click', function() {
            window.location.reload();
          });
        }
      }
    });
	}

  function gameFinished() {
      $('body').empty();
      var max_score = 0;
      var max_id = "";
      for (var cand in propos_displayed) {
          if (propos_displayed[cand] >= max_score) {
              max_score = propos_displayed[cand];
              max_id = cand;
          }
      }
      return max_id;
  }

  //---------------------
  //---------------------
  //---------------------

	function startApp() {
    showLoader(false);
    $("#buttons-response").animate(
      {"bottom": "20px"},
      {duration:500, easing: "easeOutElastic", queue: false}
    );
    
    QUESTIONS = prepare_game_set(NB_QUESTIONS);
    var p = get_next_question();
    show(p);
	};

	function startTimer() {
		var tps = timer, interval = 10;
		$('#timer').show();
		intervalSetter = window.setInterval(function() {
			tps -= interval;
			var width = tps*100/timer;
			$('#timer span').css('width', width+'%');
			if($('#timer span').width()<=0) {
				reinitTimer();
				slide();
			}
		}, 5);

	}

	function reinitTimer() {
		console.log("intervalSetter : ");
		console.log(intervalSetter);
		clearInterval(intervalSetter);
		intervalSetter = null;
		console.log("intervalSetter cleared : ");
		console.log(intervalSetter);
		$('#timer span').css('width', '100%');
	}
  
});
