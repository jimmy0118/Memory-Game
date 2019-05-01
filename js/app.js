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


// Create a list for rating
const starList = [
                  ["fas fa-star", "fas fa-star", "fas fa-star"],
                  ["fas fa-star", "fas fa-star", "far fa-star"],
                  ["fas fa-star", "far fa-star", "far fa-star"]
                 ];


// Global variable
const deck = document.querySelector('.deck');
const matchingCard = [];
const attemptCounter = document.querySelector('.moves');
let clicks = 0;
let attempts = 0;
const restart = document.querySelector('.restart');


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
  // CLean out the deck
  while (deck.firstChild) {
    deck.removeChild(deck.firstChild);
  }

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

  // Set 3 stars for the initial game page
  rating(attempts);
}


// Function for incremental counter
function counter() {
  clicks++;
  if (clicks % 2 === 0) {
    attempts++;
    attemptCounter.textContent = attempts;
  }

  // Giving ratings based on attempts
  rating(attempts);
}


// Function of ratings
function rating(times) {
  let num = 0;
  if (times <= 16) {
    num = 0;
  } else if (times <= 24 && times > 16) {
    num = 1;
  } else {
    num = 2;
  }
  showStar(num);
}


// Function for showing stars
function showStar(i) {
  const stars = document.querySelector('.stars');

  // Clean out the old HTML element of showing stars
  while (stars.firstChild) {
    stars.removeChild(stars.firstChild);
  }

  // Creating HTML elements for showing stars
  for (const star of starList[i]) {
    const starHtml = document.createElement('li');
    starHtml.innerHTML = `<i class="${star}"></i>`;
    stars.appendChild(starHtml);
  }
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

     // Increment attemptCounter
     counter();
    }
  }
}


// Set up the event listener for all cards.
deck.addEventListener('click', matching);


// Set up the event listener for restart button.
restart.addEventListener('click', initGame);


// Display the initial page
initGame();
