'use strict';

//selecting elements
const player0EL = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const cuurentE0l = document.getElementById('current--0');
const cuurentE01 = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');
const btnReset = document.querySelector('.btn--new');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//RESETTING THE GAME
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  cuurentE0l.textContent = 0;
  cuurentE01.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEL.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

//ROLLING DICE FUNCTIONALITY
buttonRoll.addEventListener('click', function () {
  if (playing) {
    //1.generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2.display the dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;
    //3.check if the dice is 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//HOLD SCORE
buttonHold.addEventListener('click', function () {
  if (playing) {
    //1.add current score to the score of the active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.check if the score >= 100 and finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch to the next players
      switchPlayer();
    }
  }
});

btnReset.addEventListener('click', init);
