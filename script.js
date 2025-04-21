const arabicLetters = ['ا', 'ب', 'ج', 'د', 'ه', 'و', 'ز', 'ح', 'ط', 'ي', 'ك', 'ل', 'م', 'ن', 'س', 'ع', 'ف', 'ص', 'ق', 'ر', 'ش', 'ت', 'ث', 'خ', 'ذ', 'ض'];

let currentPlayer = 1; // 1 for team 1, 2 for team 2
let board = [];

const gameBoard = document.getElementById("gameBoard");
const shuffleBtn = document.getElementById("shuffleBtn");

function initializeBoard() {
    board = [];
    gameBoard.innerHTML = ''; // Clear the board before adding new cells
    const shuffledLetters = [...arabicLetters].sort(() => Math.random() - 0.5);
    
    shuffledLetters.forEach((letter, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.textContent = letter;
        cell.addEventListener("click", handleCellClick);
        gameBoard.appendChild(cell);
        board.push({
            letter: letter,
            state: 0, // 0 = empty, 1 = team 1, 2 = team 2
        });
    });
}

function handleCellClick(event) {
    const cellIndex = event.target.dataset.index;
    const cellState = board[cellIndex].state;

    if (cellState === 0) {
        board[cellIndex].state = currentPlayer;
        event.target.style.backgroundColor = currentPlayer === 1 ? "red" : "blue";
        currentPlayer = currentPlayer === 1 ? 2 : 1;
    } else if (cellState === 1) {
        board[cellIndex].state = 2;
        event.target.style.backgroundColor = "blue";
    } else if (cellState === 2) {
        board[cellIndex].state = 0;  // Reset the cell
        event.target.style.backgroundColor = "lightgray"; // Reset the color to the default
    }
}

function shuffleLetters() {
    initializeBoard();
}

shuffleBtn.addEventListener("click", shuffleLetters);

// Initialize the board
initializeBoard();


function checkWin() {
    // Check rows (left to right)
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col <= 0; col++) {
            const start = row * 5 + col;
            if (board[start].state && board[start].state === board[start + 1].state &&
                board[start].state === board[start + 2].state && board[start].state === board[start + 3].state && board[start].state === board[start + 4].state) {
                alert(`Team ${board[start].state} wins horizontally!`);
                return;
            }
        }
    }
    
    // Check columns (up to down)
    for (let col = 0; col < 5; col++) {
        for (let row = 0; row <= 0; row++) {
            const start = row * 5 + col;
            if (board[start].state && board[start].state === board[start + 5].state &&
                board[start].state === board[start + 10].state && board[start].state === board[start + 15].state && board[start].state === board[start + 20].state) {
                alert(`Team ${board[start].state} wins vertically!`);
                return;
            }
        }
    }
}
