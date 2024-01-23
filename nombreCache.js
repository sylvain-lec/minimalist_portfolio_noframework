let nombreCache;
let nbreCoupsJoues = 0;
let nbreCoupsMax = 10;
let borneMin = 0, borneMax = 100;
 
onload = function() {
  debuterPartie();
  document.getElementById("jouerBtn").onclick = jouer;
  document.getElementById("finPartieBtn").onclick = abandonner;
  document.getElementById("debutPartieBtn").onclick = debuterPartie;
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
 
function debuterPartie() {
  nombreCache = getRandomInt(borneMin, borneMax + 1);
  nbreCoupsJoues = 0;
  document.getElementById("partieEncours").style.display = 'block';
  document.getElementById("partieTerminee").style.display = 'none';
  document.getElementById("message").innerHTML = "<br /><br />";
  document.getElementById("prop").value = "";
}

function jouer() {
  let message = "";
  let partieTerminee = false;
  // lire la valeur dans le champ texte prop
  const proposition = parseInt(document.getElementById("prop").value);
  if (proposition < borneMin || proposition > borneMax) {
    message = "NOOOOOOONNNNNNN !!";
  } else {
    nbreCoupsJoues++;
    if (proposition === nombreCache) {
      document.getElementById("message").setAttribute("class","gagne");
      message = "Bravo ! Vous avez gagné<br>en " + nbreCoupsJoues + " essai(s) ! Je suis sûr que vous avez triché cependant...";
      partieTerminee = true;
    }
    else {
      document.getElementById("message").setAttribute("class","perdu");
      if (proposition < nombreCache) {
        message = "trop petit<br>";
      } else {
        message = "trop grand<br>";
      }
       
      if (nbreCoupsJoues < nbreCoupsMax) {
        message += "Rejouez ! il vous reste " + (nbreCoupsMax - nbreCoupsJoues) + " essai(s)";
      }
      else {
        message += " - vous avez perdu, le nombre était " + nombreCache + ". Ma grand mère aurait fait mieux !";
        partieTerminee = true;
      }
    }
  }

  // afficher le message
  document.getElementById("message").innerHTML = message;
  if (partieTerminee) {
    // cacher les boutons jouer et abandonner
    // montrer le bouton rejouer
    document.getElementById("partieEncours").style.display = 'none';
    document.getElementById("partieTerminee").style.display = 'block';
  }
}
 
function abandonner() {
  const message = "Vous avez eu raison d'abandonner?<br>Le nombre caché était : " + nombreCache + " et vous n'auriez jamais trouvé !";
  document.getElementById("message").innerHTML = message;
  // cacher les boutons jouer et abandonner
  // montrer le bouton rejouer
  document.getElementById("partieEncours").style.display = 'none';
  document.getElementById("partieTerminee").style.display = 'block';
}
