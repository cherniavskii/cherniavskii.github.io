;(function() {
  "use strict";

  /* Get all necessary elements */
  var mLetters = document.querySelector('.missed__letters');
  var letters = document.querySelector('.letters');
  var gameOverPopup = document.querySelector('.game__over');
  var newGame = document.querySelector('.new-game');
  var missedTitle = document.querySelector('.missed__title');
  var hangman = document.querySelector('.hangman');
  
  var word, words, wordIndex, splittedWord, guessedLetters = [], missedLetters = [];
  
  /*Wordnik API URL for getting 100 words (nouns only) with min length 3 and max length 11*/
  var apiUrl = 'http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=11&limit=100&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';

  /* Creatinge lement for missing letter */ 
  var mLetter = document.createElement('li');
  mLetter.className = 'm__letter';
  
  loadWords();


  /* Loads an array of 100 words */
  function loadWords() {
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();

    xhr.open('GET', apiUrl, true);

    xhr.onload = function() {
      words = JSON.parse(this.responseText);
      wordIndex = -1;
      nextWord();
    };

    xhr.onerror = function() {
      alert( 'Network error ' + this.status );
    };

    xhr.send();
  }

  function nextWord() {
    clearGame();

    wordIndex++;

    /* Check if there are unused words in array. If no - function 'loadWords' will load new array */ 
    if (wordIndex > words.length - 1) {
      loadWords();
      return;
    }

    /* Picking one word from array */
    word = words[wordIndex].word;
    splittedWord = word.toLowerCase().split('');
    
    /* If there are unnecessary symbols in this word - takes next one */
    if (splittedWord.indexOf('-') != -1 || splittedWord.indexOf("\'") != -1) {
      nextWord();
      return;
    }

    /* Makes active cells for letters */
    for (var i = 11 - word.length; i < 11; i++) {
      letters.children[i].classList.add('letter_active');
    }

    document.addEventListener('keypress', tryLetter);
  }

  /* Restores all CSS classes and removes unnecessary event listeners before new game round */
  function clearGame() {
    document.removeEventListener('keypress', tryLetter);
    newGame.removeEventListener('click', nextWord);
    gameOverPopup.classList.add('hidden');

    guessedLetters = [];
    missedLetters = [];
    
    missedTitle.classList.add('hidden');
    hangman.classList.remove('hang');

    for (var i = 0; i < letters.children.length; i++) {
      letters.children[i].classList.remove('letter_active');
      letters.children[i].classList.remove('letter_won');
      letters.children[i].innerHTML = '';
    }

    for (i = mLetters.children.length - 1; i >= 0; i--) {
      mLetters.removeChild(mLetters.children[i]);
    }
    
    for (i = 1; i < 12; i++) {
      document.querySelector('.frame' + i).classList.add('hidden');
    }
  } 

  /* Once letter key pressed on keyboard - check if there is such letter in the word */
  function tryLetter(e) {
    var inputLetter = getChar(e);

    /* If this letter was already checked - return and wait for another letter */
    if (guessedLetters.indexOf(inputLetter) != -1 || missedLetters.indexOf(inputLetter) != -1) return;

    /* If this is not a Latin letter - return and wait for another letter */
    if (e.charCode < 97 || e.charCode > 122) return;

    if (splittedWord.indexOf(inputLetter) != -1) { 
      showGuessed(inputLetter);
    } else {
      showMissed(inputLetter);
    }
  }
  
  /* If word contains chosen letter */
  function showGuessed(inputLetter) {
    var index = -1;

    /* Show guessed letter */
    while (splittedWord.indexOf(inputLetter, index + 1) != -1) {
      index = splittedWord.indexOf(inputLetter, index + 1);
      letters.children[11 - word.length + index].innerHTML = inputLetter;
      guessedLetters.push(inputLetter);
    }

    /* If all letters in the word are quessed - go to next word */ 
    if (guessedLetters.length == splittedWord.length) {
      document.removeEventListener('keypress', tryLetter);
      
      for (var i = 11 - word.length; i < 11; i++) {
        letters.children[i].classList.add('letter_won');
      }
      
      setTimeout(nextWord, 1000); 
    }
  }

  /* If word does't contain chosen letter */
  function showMissed(inputLetter) {
    missedTitle.classList.remove('hidden');
    
    missedLetters.push(inputLetter);

    /* Show this letter in list of missed */
    mLetter.textContent = inputLetter;
    mLetters.appendChild(mLetter.cloneNode(true));
    
    /* If game is not over show the next frame of hangman */
    if (missedLetters.length <= 11) {
      document.querySelector('.frame' + missedLetters.length).classList.remove('hidden');
    }

    /* If game is over - start 'gameOver' function */
    if (missedLetters.length > 10) {
      hangman.classList.add('hang');
      setTimeout(gameOver, 500);
    }
  }

  function gameOver() {
    document.removeEventListener('keypress', tryLetter);

    /* Show game__over window */
    gameOverPopup.classList.remove('hidden');
    document.querySelector('.over__word').textContent = 'word: ' + word.toLowerCase();
    newGame.addEventListener('click', nextWord);
  }

  /* Cross-browser function for getting a character from 'keypress' event */
  function getChar(event) {
    if (event.which === null) {
      if (event.keyCode < 32) return null;
      return String.fromCharCode(event.keyCode);
    }

    if (event.which !== 0 && event.charCode !== 0) {
      if (event.which < 32) return null;
      return String.fromCharCode(event.which);
    }

    return null;
  }
 
})();