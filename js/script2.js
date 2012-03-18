$(function() {

  var propos = [];
  var candis = [];
  var currentId = 0;
  var inc = 0;
  var propos_displayed = [];
  var random = 0;

  var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fvoxe.org%2Fapi%2Fv1%2Fpropositions%2Fsearch%3FcandidacyIds%3D4f1ec52e6e27d70001000007%2C4f1eddf96e27d7000100008b%2C4f2c143202b7400005000029%2C4f1888db5c664f0001000119%2C4f188a59f8104a0001000004%2C4f1887545c664f000100010f%2C4f1888945c664f0001000116%2C4f188a20f8104a0001000002%2C4f242b3269b233000100002b%22%20and%20itemPath%20%3D%20%22json.response.propositions%22&format=json';

  var id_candidacies = ['4f1ec52e6e27d70001000007',
    '4f1eddf96e27d7000100008b',
    '4f2c143202b7400005000029',
    '4f1888db5c664f0001000119',
    '4f188a59f8104a0001000004',
    '4f1887545c664f000100010f',
    '4f1888945c664f0001000116',
    '4f188a20f8104a0001000002',
    '4f242b3269b233000100002b'];

  var candidats = ['nathalie-arthaud',
    'francois-bayrou',
    'jacques-cheminade',
    'nicolas-dupont-aignan',
    'francois-hollande',
    'eva-joly',
    'marine-le-pen',
    'jean-luc-melenchon',
    'nicolas-sarkozy'];

  function getJSON() {
	showLoader(true);
    $.getJSON(url, function(data) {
    	showLoader(false);
        if (data.query.results) {
            for (var i = 0; i < 500; i++) {
                propos[i] = data.query.results.propositions[i].text;
                candis[i] = data.query.results.propositions[i].candidacy.id;
            };
            startApp();

        }
    });


  }

  function getRandom(size) { return Math.floor(Math.random()*size); }

  function getSentence(text) {
    var sentences = text.split(".");
    console.log(sentences);
    var idx = Math.floor(Math.random() * sentences.length);

    return sentences[idx] + ".";
  }

  function getPropos() {
    random = getRandom(propos.length);
    console.log(random);
    console.log(propos.length);
    console.log(propos[random]);
    return {text: getSentence(propos[random]), id: candis[random]};
  }

  function getCandidats(id) {
    for (var i = 0; i < 9; i++) {
      if (id_candidacies[i] == id) return candidats[i];
    }
  }

  function ifTakeClicked() {
    propos_displayed[candis[random]]++;
  }

  //---------------------
  //---------------------
  //---------------------

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
    $("#text").html(spinner.el);
    $(spinner.el).css("position","absolute");
    $(spinner.el).css("width","0px");
    $(spinner.el).css("margin","auto");
    $(spinner.el).css("margin-top","-100px");
    $(spinner.el).css("margin-left","50%");

    $(spinner.el).animate({"margin-top": "+=400px"} ,{duration:500, easing:"easeOutElastic",queue:true});
  };

  function hide(id){
    $("#"+id).animate({"left": "+=2000px"},{duration:500, easing:"easeInOutElastic", queue:false, complete:function(){
      $("#"+id).remove();
    }});
  return;
  }

function show(p){
	var proposition = $('<div id="'+p.id+'" class="proposition"><p>'+p.text+'</p></div>');
	proposition.css({left:-$(window).width()-50});
	// proposition.css('left',-$(window).width()-50);
	$("body").append(proposition);

	$("#"+p.id).animate({"left": "0"},{duration:500, queue:false, complete:function(){
		$('buttons-response').removeClass('moving');
	}});
}

	// $("body").append("<div class='progressbar' style='position:fixed;top:left;right:0px;width:300px;height:30px'></div>);
	// $(".progressbar").progressbar({
			// value: 37
		// });
	// $("#progressbar .ui-progressbar-value").addClass("ui-corner-right");
	// $("#progressbar .ui-progressbar-value").animate({width: 300}, 'slow')

	$("body").css("height","100%");
	$("body").css("overflow","hidden");
 	$("body").css("background-color","#74C5E3");

	//showLoader(true);
	//showLoader(false);

  //---------------------
  //---------------------
  //---------------------
  showLoader(true);
  getJSON();

  $('#buttons-response').show();

	$("#buttons-response:not('.moving') .button-response").live("click",function(event){
		console.log("Click button : ");
		var $this = $(this);
		if($this.attr('id') == "take") {
			// Incrémente la valeur du candidat X
				// On récupère X en fonction de l'id de la proposition
		} else {
			// Désincrémente la valeur du candidat X
				// Idem pour l'id
		}
		slide();
		event.preventDefault();
	});

	function slide() {
		$('#buttons-response').addClass('moving');
		$("#"+currentId).animate({"left": $(window).width()+50},{duration:200, easing:"swing",queue:false, complete:function(){
			$(this).remove();
			var p = getPropos();
			show(p);
		}});
	}


  //---------------------
  //---------------------
  //---------------------

    function get_bogus_sentences() {
      var sentences = [
        "L'alcoolisme des personnes âgées est un véritable fléau qui provoque de nombreux drames. Je propose de limiter l'accès aux boissons alcoolisées de plus de 10° aux personnes de moins de 75 ans.",
        "Les jeunes de moins de 25 ans ne devraient pas payer d'impôts sur le revenu.",
        "La viande Halal augmente l'émission de gaz à effet de serre. Il faut limiter le nombre d'abattage rituel sur le sol français.",
        "La loi Hadopi sera abrogée. Un fonds stratégique sera créé et financé par l'état afin de couvrir les pertes de l'industrie audiovisuelle.",
        "La France doit non seulement quitter l'Europe, mais aussi l'Otan, l'OCDE et l'OMC.",
        "La production d'énergie nucléaire doit être abandonnée pour toutes les régions de la métropole.",
        "L'utilisation des téléphones mobiles doit être interdite dans les lieux publics fermés.",
        "L'indépendance de la Corse sera réétudiée.",
        "Le nombre de fonctionnaires de police sera augmenté de 50% sur sur 5 ans.",
        "La formation aux outils informatiques de type Tweeter ou Facebook sera obligatoire dès le collège."
      ];

      return sentences;
    }

    // function filter_proposition(proposition) {
      // return( { id: proposition.response.id,
                // sentence: select_sentence(proposition.response.text),
                // candidacy: proposition.candidacy}
            // );
    // }

    // function prepare_question_set(size, propos) {
        // var propos_size = propos.length
        // var res = [];


        // for(var i = 0; i < size; i++) {

            // var idx = Math.floor(Math.random() * propos_size);
            // res.push(filter_proposition(propos[idx]));
        // }

        // return res;
    // }

    // var CURRENT = 0;
    // var QUESTIONS = prepare_question_set(20, propos);

    // function get_next_question() {
        // if (CURRENT < QUESTIONS.length)
            // {
                // return QUESTIONS[CURRENT++];
            // }
        // else
            // {
                // CURRENT = 0;
                // return null;
            // }

    // }

  // On envoie une proposition : propos[iRandom]
  // Si il répond oui, on incrémente un tableau associatif : tab[candis[iRandom]]++
  // A la fin du jeu, on cherche la valeur de tab la plus grande, on prend la key correspondante
  // On utilise la fonction getCandidats pour récupérer son nom : getCandidats(key)

	function startApp(){
			showLoader(false);


	};

	function initApp(){

	};


	var pTemp = getPropos();
	var proposition = $('<div id="'+pTemp.id+'" class="proposition"><p>'+pTemp.text+'</p></div>');
		currentId = pTemp.id;
	$("body").append(proposition);

});
