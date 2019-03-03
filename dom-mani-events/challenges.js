/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (!gamePlaying) return;

  var dice1 = Math.floor(Math.random() * 6) + 1;
  var dice2 = Math.floor(Math.random() * 6) + 1;

  document.getElementById('dice-1').style.display = 'block';
  document.getElementById('dice-2').style.display = 'block';
  document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
  document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

  if (dice1 !== 1 && dice2 !== 1) {
    roundScore += dice1 + dice2;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    nextPlayer();
  }
  /*
  if (dice === 6 && lastDice === 6) {
    scores[activePlayer] = 0;
    roundScore = 0;

    document.querySelector('#score-' + activePlayer).textContent = 0;
    nextPlayer();
  } else if (dice !== 1) {
    roundScore += dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    nextPlayer();
  }

  lastDice = dice;
  */
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (!gamePlaying) return;

  scores[activePlayer] += roundScore;
  roundScore = 0;

  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

  var winningScore = document.querySelector('.final-score').value || 100;

  if (scores[activePlayer] >= winningScore) {
    gamePlaying = false;

    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
  } else {
    nextPlayer();
  }
});

function nextPlayer() {
  roundScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  document.querySelector('#current-0').textContent = roundScore;
  document.querySelector('#current-1').textContent = roundScore;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector(`.player-0-panel`).classList.remove('winner');
  document.querySelector(`.player-1-panel`).classList.remove('winner');
  document.querySelector(`.player-0-panel`).classList.remove('active');
  document.querySelector(`.player-1-panel`).classList.remove('active');
  document.querySelector(`.player-0-panel`).classList.add('active');
}
