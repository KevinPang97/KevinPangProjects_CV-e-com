/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
const prompt = require("prompt-sync")({ sigint: true });

let board = {
  1: " ",
  2: " ",
  3: " ",
  4: " ",
  5: " ",
  6: " ",
  7: " ",
  8: " ",
  9: " ",
};

//update the gameboard with the user input
function markBoard(position, mark) {
  board[position.toString()] = mark;
}

//print the game board as described at the top of this code skeleton
let cBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function printBoard() {
  for (let i = 1; i <= 9; i++) {
    if (board[i.toString()] != " ") {
      cBoard[i - 1] = board[i.toString()];
    }
  }

  console.log("");
  console.log(cBoard[0] + " | " + cBoard[1] + " | " + cBoard[2]);
  console.log("---------");
  console.log(cBoard[3] + " | " + cBoard[4] + " | " + cBoard[5]);
  console.log("---------");
  console.log(cBoard[6] + " | " + cBoard[7] + " | " + cBoard[8]);
}

// check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position) {
  for (let validInput = 1; validInput <= 9; validInput++) {
    if (position == validInput) {
      if (board[position.toString()] == " ") {
        return true;
      }
    }
  }

  return false;
}

// list out all the combinations of winning
let winCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
  let playerInput = [];
  let playerInput3As1 = [];

  for (let validPosition in board) {
    if (board[validPosition] == player) {
      playerInput[playerInput.length] = Number(validPosition);
    }
  }

  for (let element of winCombinations) {
    let all3Match = 0;
    for (let k = 0; k < playerInput.length; k++) {
      if (element.indexOf(playerInput[k]) >= 0) {
        all3Match++;
      }
      if (all3Match == 3) {
        return true;
      }
    }
  }

  return false;
}

// implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
  for (let element in board) {
    if (board[element] == " ") {
      return false;
    }
  }

  return true;
}

// the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
  let validateMoveFlag = false;
  while (!validateMoveFlag) {
    var userInput = prompt(player + "'s turn. Input:");
    validateMoveFlag = validateMove(userInput);

    if (!validateMoveFlag) {
      console.log("Invalid entry. Please enter unoccupied number from 1-9");
    }
  }

  markBoard(userInput, player);
  printBoard();

  if (checkWin(player)) {
    console.log(player + " wins!");
    winnerIdentified = true;
  } else {
    if (checkFull()) {
      console.log("It's a tie!");
      winnerIdentified = true;
    }
  }

  if (currentTurnPlayer == "X") {
    currentTurnPlayer = "O";
  } else if (currentTurnPlayer == "O") {
    currentTurnPlayer = "X";
  }
}

// entry point of the whole program
console.log(
  "Game started: \n\n" +
    " 1 | 2 | 3 \n" +
    " --------- \n" +
    " 4 | 5 | 6 \n" +
    " --------- \n" +
    " 7 | 8 | 9 \n"
);

let winnerIdentified = false;
var currentTurnPlayer = "X";
document.getElementById("asd").innerHTML = currentTurnPlayer;

while (!winnerIdentified) {
  playTurn(currentTurnPlayer);

  let replay = "n";
  if (winnerIdentified) {
    replay = prompt("Replay? (Input 'y' to replay): ");
  }

  if (replay.toLowerCase() == "y") {
    winnerIdentified = false;
    currentTurnPlayer = "X";
    cBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    replay = "n";
    board = {
      1: " ",
      2: " ",
      3: " ",
      4: " ",
      5: " ",
      6: " ",
      7: " ",
      8: " ",
      9: " ",
    };
    console.log(
      "---------\n\nGame started: \n\n" +
        " 1 | 2 | 3 \n" +
        " --------- \n" +
        " 4 | 5 | 6 \n" +
        " --------- \n" +
        " 7 | 8 | 9 \n"
    );
  }
}
console.log("exiting ...");
