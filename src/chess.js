import { db, auth } from './firebase.js';
import { ref, onValue, set } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-database.js";

const board = document.getElementById('chessboard');
const status = document.getElementById('status');

const pieces = {
  r: "♜", n: "♞", b: "♝", q: "♛", k: "♚", p: "♟",
  R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔", P: "♙"
};

let gameRef = null;

auth.onAuthStateChanged(user => {
  if (!user) return;

  gameRef = ref(db, `games/test-game`);
  onValue(gameRef, snapshot => {
    const state = snapshot.val();
    drawBoard(state?.board || defaultBoard());
  });
});

function defaultBoard() {
  return [
    "rnbqkbnr", "pppppppp", "        ", "        ",
    "        ", "        ", "PPPPPPPP", "RNBQKBNR"
  ];
}

function drawBoard(boardState) {
  board.innerHTML = '';
  boardState.forEach((row, rowIndex) => {
    row.split('').forEach((cell, colIndex) => {
      const square = document.createElement('div');
      square.className = 'square ' + ((rowIndex + colIndex) % 2 ? 'dark' : '');
      square.dataset.row = rowIndex;
      square.dataset.col = colIndex;
      square.innerText = pieces[cell] || '';
      board.appendChild(square);
    });
  });
}
