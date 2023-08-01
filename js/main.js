let turn;
let board;
let winner;
// new game
function newGame() {
  board = new Array(9).fill(null);
  turn = 'X';
  winner = null;
  updateView();
}
// next turn
function nextTurn() {
  if (turn == 'X') {
    turn = 'O';
  } else {
    turn = 'X';
  }
}
// make move
function makeMove(i) {
  if (findWinningCombs()) {
    return;
  }
  if (board[i]) {
    return;
  }
  board[i] = turn;
  let winningComb = findWinningCombs();
  if (!winningComb) {
    nextTurn();
  }
}
// update view
function updateView() {
  updateTurn();
  let gameOver = findWinningCombs();
  for (let i = 0; i < board.length; i++) {
    let tile = document.querySelector(`.tile[data-index="${i}"]`);
    tile.textContent = board[i];
    tile.classList.remove('winner');
    let tileType = board[i] === 'X' ? 'tile-x' : 'tile-o';
    tile.innerHTML = `<span class="${tileType}"> ${
      board[i] ? board[i] : ''
    } </span>`;
    if (gameOver && gameOver.includes(i)) {
      tile.classList.add('winner');
    }
  }
  if (gameOver) {
    document.querySelector(`.player-${winner}`).classList.add('win');
  } else {
    document.querySelector(`.player-x`).classList.remove('win');
    document.querySelector(`.player-o`).classList.remove('win');
  }
}
// update turn
function updateTurn() {
  let playerX = document.querySelector('.player-x');
  let playerO = document.querySelector('.player-o');
  playerX.classList.remove('active');
  playerO.classList.remove('active');
  if (turn == 'X') {
    playerX.classList.add('active');
  } else {
    playerO.classList.add('active');
  }
}
// find winning combination
function findWinningCombs() {
  const winningCombs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];
  for (const comb of winningCombs) {
    const [a, b, c] = comb;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = turn.toLowerCase();
      return comb;
    }
  }
  return null;
}
// handle tile click
let tiles = document.querySelectorAll('.tile');
tiles.forEach((tile, ind) => {
  tile.addEventListener('click', () => {
    onClickHandler(ind);
  });
});
function onClickHandler(ind) {
  makeMove(ind);
  updateView();
}
// restart the game
document.querySelector('.restart').addEventListener('click', () => {
  newGame();
  updateView();
});

newGame();
