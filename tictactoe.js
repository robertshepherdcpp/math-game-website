document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.cell');
    const currentPlayerDisplay = document.getElementById('current-player');
    const winnerDisplay = document.getElementById('winner');

    let currentPlayer = 'X';
    let winner = null;

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    function handleCellClick() {
        if (!winner && !this.textContent) {
            this.textContent = currentPlayer;
            checkWinner();
            if (!winner) {
                currentPlayer = X;
                currentPlayerDisplay.textContent = `Player ${currentPlayer}'s Turn`;
                setTimeout(robotMove, 500); // Delay robot move for better visualization
            }
        }
    }

    function robotMove() {
        if (!winner) {
            let emptyCells = [...cells].filter(cell => !cell.textContent);
            if (emptyCells.length > 0) {
                let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                randomCell.textContent = O;
                checkWinner();
                if (!winner) {
                    currentPlayer = X;
                    currentPlayerDisplay.textContent = `Player ${currentPlayer}'s Turn`;
                }
            }
        }
    }

    function checkWinner() {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        winningConditions.forEach(condition => {
            const [a, b, c] = condition;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                winner = cells[a].textContent;
                cells[a].style.backgroundColor = cells[b].style.backgroundColor = cells[c].style.backgroundColor = 'lightgreen';
            }
        });

        if (winner) {
            winnerDisplay.textContent = `Player ${winner} wins!`;
        } else if (![...cells].some(cell => cell.textContent === '')) {
            winnerDisplay.textContent = 'It\'s a draw!';
        }
    }
});