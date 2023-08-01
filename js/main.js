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
