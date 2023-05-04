const inputs = document.querySelector(".inputs"),
  hintTag = document.querySelector(".hint span"),
  guessLeft = document.querySelector(".guess-left span"),
  wrongLetter = document.querySelector(".wrong-letter span"),
  resetBtn = document.querySelector(".reset-btn"),
  solutionBtn = document.querySelector(".solution-btn"),
  typingInput = document.querySelector(".typing-input"),
  solve = document.querySelector(".solve");

let word,
  maxGuesses,
  incorrectLetters = [],
  correctLetters = [];
let cir = document.querySelector(".circle");

function randomWord() {
  solve.innerText = "";
  // make person hidden ,when start the game
  for (let k = 0; k < 8; k++) {
    cir.children[k].style.setProperty("visibility", "hidden");
  }
  let ranItem = wordList[Math.floor(Math.random() * wordList.length)]; // index of array words
  word = ranItem.word; // choose the word from array words
  maxGuesses = 8; //  number of trying
  correctLetters = [];
  incorrectLetters = [];
  // to show in page
  hintTag.innerText = ranItem.hint;
  guessLeft.innerText = maxGuesses;
  wrongLetter.innerText = incorrectLetters;

  // make inputs ==> length of letter
  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
    inputs.innerHTML = html;
  }

  // to show the hint from word
  for (let k = 1; k < Math.trunc(word.length); k = k + 2) {
    inputs.querySelectorAll("input")[k].value = word[k];
  }
}

randomWord();

function initGame(e) {
  let key = e.target.value.toLowerCase(); // make word small letters

  if (
    key.match(/^[A-Za-z]+$/) &&
    !incorrectLetters.includes(` ${key}`) &&
    !correctLetters.includes(key)
  ) {
    //input : letters only
    if (word.includes(key)) {
      for (let i = 0; i < Math.trunc(word.length); i = i + 2) {
        if (word[i] == key) {
          correctLetters += key; // if letter true , add it
          inputs.querySelectorAll("input")[i].value = key; // show true letter in screen
          console.log(correctLetters);
        }
      }
    } else {
      maxGuesses--; // if letter false ,
      incorrectLetters.push(` ${key}`); // show number of attempts remaining
      cir.children[maxGuesses].style.setProperty("visibility", "visible"); // show some part of person
    }
    // show in screen
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;
  }
  typingInput.value = "";

  // show the massage if won or lose
  setTimeout(() => {
    if (correctLetters.length === Math.ceil(word.length / 2)) {
      alert(`Congrats! You found the word ${word.toUpperCase()}`);
      return randomWord();
    } else if (maxGuesses < 1) {
      alert("Game over! You don't have remaining guesses");
      for (let i = 0; i < word.length; i++) {
        inputs.querySelectorAll("input")[i].value = word[i];
      }
    }
  }, 100);
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());

// My NLP

let text =
  "Kenan and his father left the house early to spend the day off , in the morning they went to a big building to withdraw some money from the bank , cairo is the capital of egypt , then they went to the library to buy some materials and books , then they went to the zoo to see the animals in cages , and at night they went to watching a movie in the cinema .";

solutionBtn.addEventListener("click", function () {
  // (Tokenizer) split the text array in array
  let txtSplit = text.split(" ");

  let x = [];
  let bigArr = [];

  for (let i = 0; i < txtSplit.length; i++) {
    if (txtSplit[i] !== "," && txtSplit[i] !== ".") {
      x.push(txtSplit[i]);
    } else {
      bigArr.push(x);
      x = [];
    }
  }

  // find 2 words to help in solution from the screen
  let words = hintTag.innerHTML.split("+");

  let results = []; // results => words in same length with solution (may be more than a word)
  let letters = []; // letters => the hint show in screen

  for (let b = 0; b < bigArr.length; b++) {
    // check if 2 hint in the sentence or not
    if (bigArr[b].includes(words[0]) && bigArr[b].includes(words[1])) {
      // console.log(bigArr[b]);

      for (let a = 0; a < bigArr[b].length; a++) {
        // bigArr[b] => the true sentence
        if (bigArr[b][a].length === inputs.children.length) {
          results.push(bigArr[b][a]); // may be more than one word have the same length
        }
      }
      // console.log(results);

      for (let o = 1; o < inputs.children.length; o = o + 2) {
        letters.push(inputs.children[o].value); 
      }
      // console.log(letters);
    }
  }

  // to find the the solution
  for (let p = 0; p < results.length; p++) {
    odd = [];
    for (var i = 1; i < results[p].length; i = i + 2) {
      odd.push(results[p][i]); // add letters with the choosen word(results) in odd arr
    }
    if (letters.join("") === odd.join("")) {
      // console.log(results[p]);
      solve.innerHTML = results[p];
      for (let q = 0; q < inputs.children.length; q++) {
        inputs.children[q].value = results[p][q];
      }
    }
  }
});
