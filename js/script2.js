$(function() {
  
  var propos = [];
  var candis = [];
    
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
  
  //---------------------
  //---------------------
  //---------------------
  
  $.getJSON(url, function(data) {
    if (data.query.results) {
      for (var i = 0; i < 500; i++) {
        propos[i] = data.query.results.propositions[i].text;
        candis[i] = data.query.results.propositions[i].candidacy.id;
      };
    }
  });
  
  var iRandom = Math.floor(Math.random());
  
  // On envoie une proposition : propos[iRandom]
  // Si il répond oui, on incrémente un tableau associatif : tab[candis[iRandom]]++
  // A la fin du jeu, on cherche la valeur de tab la plus grande, on prend la key correspondante
  // On utilise la fonction getCandidats pour récupérer son nom : getCandidats(key)
  
  
});