// Create a list that holds all cards
const cardList = ["fas fa-cat", "fas fa-cat",
                  "fas fa-chess-knight", "fas fa-chess-knight",
                  "fas fa-apple-alt", "fas fa-apple-alt",
                  "fas fa-futbol", "fas fa-futbol",
                  "fas fa-car-side", "fas fa-car-side",
                  "fas fa-hamburger", "fas fa-hamburger",
                  "fas fa-headphones", "fas fa-headphones",
                  "fas fa-subway", "fas fa-subway"
                 ];

// Global variable
const deck = document.querySelector('.deck');
const matchingCard = [];
const attemptCounter = document.querySelector('.moves');
let clicks = 0;
let attempts = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0 ) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Set up the initial page
function initGame() {

  // Chanege the order of list of the cards and create HTML elements
  for (const card of shuffle(cardList)) {
    const cardHtml = document.createElement('li');
    cardHtml.classList.add('card');
    cardHtml.innerHTML = `<i class="${card}"> </i>`;
    deck.appendChild(cardHtml);
  }

  // Set attemps to 0 when the game starts
  clicks = 0;
  attempts = 0;
  attemptCounter.textContent = attempts;
}

// Function for matching cards
function matching(evt) {
  if (evt.target.nodeName === 'LI') {
    if (!evt.target.classList.contains('matching') && matchingCard.length < 2) {

      // There is already a card in matchingCard array
      if (matchingCard.length === 1) {
        const firstCard = matchingCard[0];
        evt.target.classList.add('matching');
        matchingCard.push(evt.target);

        // Compare two cards in matchingCard array
        //Two cards are matched
        if (firstCard.innerHTML === evt.target.innerHTML) {
          setTimeout(function() {
            evt.target.classList.replace('matching', 'matched');
            firstCard.classList.replace('matching', 'matched');
            matchingCard.splice(0, 2);
          }, 750);
        } else {

          // Two card are not matched
          setTimeout(function() {
            evt.target.classList.remove('matching');
            firstCard.classList.remove('matching');
            matchingCard.splice(0, 2);
          }, 750);
        }
      } else {

       // No card in matchingCard array
       evt.target.classList.add('matching');
       matchingCard.push(evt.target);
     }
    }
  }
}

// Set up the event listener for all cards.
deck.addEventListener('click', matching);

// Display the initial page
initGame();
