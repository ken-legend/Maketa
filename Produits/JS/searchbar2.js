


const input = document.getElementById("searchInputt");
const phrases = [
  "Découvrez plus chez Maketa...",
  "Coiffure, massage, yoga...",
  "Trouvez votre service parfait..."
];

let currentPhrase = 0;
let letterIndex = 0;
let typingDelay = 100;
let eraseDelay = 50;
let nextPhraseDelay = 2000;

function type() {
  if (letterIndex < phrases[currentPhrase].length) {
    input.setAttribute("placeholder", phrases[currentPhrase].substring(0, letterIndex + 1));
    letterIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, nextPhraseDelay);
  }
}

function erase() {
  if (letterIndex > 0) {
    input.setAttribute("placeholder", phrases[currentPhrase].substring(0, letterIndex - 1));
    letterIndex--;
    setTimeout(erase, eraseDelay);
  } else {
    currentPhrase = (currentPhrase + 1) % phrases.length;
    setTimeout(type, typingDelay);
  }
}

// Lancer l'animation
type();
