let turn;
let board;
let winner;
// new game
function newGame() {
  board = new Array(9).fill(null);
  turn = 'X';
  winner = null;
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
  board[i] = turn;
  let winningComb = findWinningCombs();
  if (!winningComb) {
    nextTurn();
  }
}
// update view
function updateView() {
  updateTurn();
  for (let i = 0; i < board.length; i++) {
    let tile = document.querySelector(`.tile[data-index="${i}"]`);
    tile.textContent = board[i];
  }
}
