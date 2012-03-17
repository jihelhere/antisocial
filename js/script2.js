$(function() {

  var propos = [];
  var candis = [];
  var propositionRead = 0;


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

  var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fvoxe.org%2Fapi%2Fv1%2Fpropositions%2Fsearch%0A%22%20and%20itemPath%20%3D%20%22json.response.propositions%22&format=json';

  function getCandidats(id) {
    for (var i = 0; i < 9; i++) {
      if (id_candidacies[i] == id) return candidats[i];
    }
  }

  function selectSentence(text) {
    var sentences = text.split(/[\.\?!;]/);
    var idx = Math.floor(Math.random() * sentences.length);

    return sentences[idx];
  }


    function get_bogus_sentences()
    {
        var sentences = [
            "L'alcoolisme des personnes âgées est un véritable fléau qui provoque de nombreux drames. Je propose de limiter l'accès aux boissons alcoolisées de plus de 10° aux personnes de moins de 75 ans.",
            "Les jeunes de moins de 25 ans ne devraient pas payer d'impôts sur le revenu.",
            "La viande Halal augmente l'émission de gaz à effet de serre. Il faut limiter le nombre d'abattage rituel sur le sol français.",
            "La loi Hadopi sera abrogée. Un fonds stratégique sera créé et financé par l'état afin de couvrir les pertes de l'industrie audiovisuelle.",
            "La France doit non seulement quitter l'Europe, mais aussi l'Otan, l'OCDE et l'OMC.",
            "La production d'énergie nucléaire doit être abandonnée pour toutes les régions de la métropole.",
            "L'utilisation des téléphones mobiles doit être interdite dans les lieux publics fermés.",
            "L'indépendance de la Corse sera réétudiée.",
            "Le nombre de fonctionnaires de police sera augmenté de 50% sur sur 5 ans."
            "La formation aux outils informatiques de type Tweeter ou Facebook sera obligatoire dès le collège."
        ];

        return sentences;
    }


    function filter_proposition(proposition)
    {
        return( { id: proposition.response.id,
                  sentence: select_sentence(proposition.response.text),
                  candidacy: proposition.candidacy}
              );
    }


    function prepare_question_set(size, propos)
    {
        var propos_size = props.length
        var res = [];


        for(var i = 0; i < size; i++) {

            var idx = Math.floor(Math.random() * propos_size);
            res.push(filter_proposition(propos[idx]));
        }

        return res;
    }

    var CURRENT = 0;
    var QUESTIONS = prepare_question_set(20, propos);

    function get_next_question()
    {
        if(CURRENT < QUESTIONS.length)
            {
                return QUESTIONS[CURRENT++];
            }
        else
            {
                CURRENT = 0;
                return null;
            }

    }





  //---------------------
  //---------------------
  //---------------------

    $.ajaxSetup({'async': false});

    $.getJSON(url, function(data) {
        if (data.query.results) {
            for (var i = 0; i < 500; i++) {
                propos[i] = data.query.results.propositions[i].text;
                candis[i] = data.query.results.propositions[i].candidacy.id;
            };
            propositionRead = 1;
        }
    });


    var iRandom = Math.floor(Math.random()*501);
    console.log(propos[iRandom]);

  // On envoie une proposition : propos[iRandom]
  // Si il répond oui, on incrémente un tableau associatif : tab[candis[iRandom]]++
  // A la fin du jeu, on cherche la valeur de tab la plus grande, on prend la key correspondante
  // On utilise la fonction getCandidats pour récupérer son nom : getCandidats(key)


});
